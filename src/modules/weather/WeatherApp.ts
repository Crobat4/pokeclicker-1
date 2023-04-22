import { Observable, ObservableArray } from 'knockout';
import RegionalForecast from './RegionalForecast';
import Weather from './Weather';
import WeatherForecast from './WeatherForecast';
import GameHelper from '../GameHelper';
import { Region, getDungeonIndex } from '../GameConstants';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';

export default class WeatherApp {
    public static fullForecast: ObservableArray<RegionalForecast> = ko.observableArray([]);
    public static selectedRegion: Observable<Region> = ko.observable(Region.kanto);
    public static dateList: ObservableArray<Date> = ko.observableArray([]);

    public static defaultDateRange: number = 7;

    public static generateAllRegionsForecast() {
        WeatherApp.fullForecast([]);
        GameHelper.enumNumbers(Region).forEach((r: Region) => {
            WeatherApp.generateRegionalForecast(r);
        });
    }

    public static generateRegionalForecast(region: Region, dateRange: number = WeatherApp.defaultDateRange, date: Date = new Date()) {
        const originalDate = new Date(date);
        const regionalForecast = [];
        for (let hour = 0; hour <= 23; hour += Weather.period) {
            const weekForecast = [];
            const newDate = new Date(date.setHours(hour, 0, 0, 0));
            for (let i = 0; i < dateRange; i++) {
                const weatherForecast = new WeatherForecast(new Date(newDate), Weather.getWeather(newDate, region));
                weekForecast.push(weatherForecast);
                newDate.setDate(newDate.getDate() + 1);
            }
            regionalForecast.push(weekForecast);
        }
        WeatherApp.addRegionalForecast(new RegionalForecast(region, regionalForecast));
    }

    public static generateDateList(dateRange: number = WeatherApp.defaultDateRange, date: Date = new Date()) {
        WeatherApp.dateList([]);
        const newDate = new Date(date.setHours(0, 0, 0, 0));
        const dateList = [];
        for (let i = 0; i < dateRange; i++) {
            dateList.push(new Date(newDate));
            newDate.setDate(newDate.getDate() + 1);
        }
        WeatherApp.dateList(dateList);
    }

    public static generateHourList() {
        const hourList = []
        for (let i = 0; i <= 23; i++) {
            if (i % Weather.period === 0) {
                hourList.push(i);
            }
        }
        return hourList;
    }

    public static addRegionalForecast(regionalForecast: RegionalForecast) {
        WeatherApp.fullForecast().push(regionalForecast);
    }

    public static checkDateHasPassed() {
        WeatherApp.fullForecast().forEach((rf) => {
            // Set status to hasPassed if weather end date has passed already
            rf.regionalForecast.flat().map((wf) => {
                const weatherEndDate = new Date(new Date(wf.date).setHours(wf.date.getHours() + Weather.period, 0, 0, 0))
                if (new Date() > weatherEndDate) {
                    wf.setStatusHasPassed();
                }
            });
        });
    }

    public static initialize() {
        WeatherApp.generateAllRegionsForecast();
        WeatherApp.generateDateList();
        WeatherApp.checkDateHasPassed();
    }

    public static isUnlocked() {
        return App.game.statistics.dungeonsCleared[getDungeonIndex('Weather Institute')]() > 0;
    }

    public static openWeatherAppModal() {
        if (WeatherApp.isUnlocked()) {
            $('#weatherAppModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need to clear Weather Institute first to unlock this feature.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    // Save stuff
    saveKey = 'weatherapp';
    defaults: Region;
    
    fromJSON(json): void {
        if (json == null) {
            return;
        }

        WeatherApp.selectedRegion(json.selectedRegion);
        //WeatherApp.reminderList(json.reminderList);
    }

    toJSON() {
        return {
            selectedRegion: WeatherApp.selectedRegion(),
            //reminderList: WeatherApp.reminderList(),
        }
    }
}

$(document).ready(() => {
    $('#weatherAppModal').on('shown.bs.modal', () => {
        const scrollBarSize = GameHelper.isOverflownX('#forecastTable') ? GameHelper.getScrollBarSize() : 0;
        $('#timeTable').css('padding-bottom', scrollBarSize);
    });
});
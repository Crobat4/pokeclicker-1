import { Observable, ObservableArray } from 'knockout';
import RegionalForecast from './RegionalForecast';
import Weather from './Weather';
import WeatherForecast from './WeatherForecast';
import GameHelper from '../GameHelper';
import { MINUTE, Region, camelCaseToString, getDungeonIndex } from '../GameConstants';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import WeatherForecastStatus from '../enums/WeatherForecastStatus';
import WeatherType from './WeatherType';

export default class WeatherApp {
    public static fullForecast: ObservableArray<RegionalForecast> = ko.observableArray([]);
    public static selectedRegion: Observable<Region> = ko.observable(Region.kanto);
    public static dateList: ObservableArray<Date> = ko.observableArray([]);
    public static notifierList: Partial<Record<Region, Array<string>>> = {};

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
                const weatherForecastDate = new Date(newDate).toLocaleString();
                const weatherForecast = new WeatherForecast(region, weatherForecastDate, Weather.getWeather(newDate, region));
                if (WeatherApp.notifierList[region]?.includes(weatherForecastDate)) {
                    weatherForecast.status(WeatherForecastStatus.enabled);
                }
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
        const now = new Date();
        // Full forecast
        WeatherApp.fullForecast().forEach((rf) => {
            // Set status to hasPassed if weather end date has passed already
            rf.regionalForecast.flat().map((wf) => {
                const weatherEndDate = new Date(new Date(wf.date).setHours(new Date(wf.date).getHours() + Weather.period, 0, 0, 0))
                if (now > weatherEndDate) {
                    wf.setStatusHasPassed();
                }
            });
        });

        // Notifier list
        Object.entries(WeatherApp.notifierList).forEach(([region, dateList]) => {
            WeatherApp.notifierList[region] = dateList.filter((date) =>  {
                const notifierEndDate = new Date(new Date(date).setHours(new Date(date).getHours() + Weather.period, 0, 0, 0));
                return now < notifierEndDate;
            });
        });
    }

    public static setNotifier(wf: WeatherForecast) {
        const notifierObject = WeatherApp.notifierList || {};
        // If array for X region doesn't exist, create it
        if (!notifierObject[wf.region]) {
            notifierObject[wf.region] = [];
        }
        if (!notifierObject[wf.region].includes(wf.date)) { // Set the reminder
            notifierObject[wf.region].push(wf.date);
            wf.status(WeatherForecastStatus.enabled);
        } else { // Remove the date
            notifierObject[wf.region] = notifierObject[wf.region].filter((d) => d !== wf.date);
            wf.status(WeatherForecastStatus.disabled);
        }
        WeatherApp.notifierList = notifierObject;
    }

    public static getWeatherNotification() {
        const now = new Date();
        Object.entries(WeatherApp.notifierList).forEach(([r, dateList]) => {
            const region = +r;
            dateList.forEach((reminderDate) => {
                const notifierDate = new Date(reminderDate);
                const startDate = new Date(reminderDate);
                const endDate = new Date(new Date(notifierDate).setHours(notifierDate.getHours() + Weather.period, 0, 0, 0));
                if (now >= startDate && now < endDate) {
                    const weather = Weather.getWeather(notifierDate, region);
                    const weatherDesc = Weather.weatherConditions[weather].description.replace(/\.+$/, ""); // Remove all ending dots (for fog weather)
                    Notifier.notify({
                        title: `<img width="30" src="assets/images/weather/weatherapp/${WeatherApp.calculateCastformIcon(weather)}.png"> Castform App`,
                        message: `${weatherDesc} in ${camelCaseToString(Region[region])}`,
                        customBGColor: Weather.weatherConditions[weather].color,
                        timeout: 30 * MINUTE,
                    });
                }
            })
        })
    }

    public static calculateCastformIcon(weather: WeatherType) {
        let castformIcon = '351';
        switch (weather) {
            case WeatherType.Sunny:
                castformIcon += '-s'; // Sunny
                break;
            case WeatherType.Rain:
            case WeatherType.Thunderstorm:
                castformIcon += '-r'; // Rain
                break;
            case WeatherType.Snow: 
            case WeatherType.Blizzard: 
            case WeatherType.Hail:
                castformIcon += '-h'; // Hail
                break;
            default:;
        }
        return castformIcon;
    }

    public static initialize() {
        WeatherApp.generateAllRegionsForecast();
        WeatherApp.generateDateList();
        WeatherApp.checkDateHasPassed();
        WeatherApp.getWeatherNotification();
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
        WeatherApp.notifierList = json.notifierList;
    }

    toJSON() {
        return {
            selectedRegion: WeatherApp.selectedRegion(),
            notifierList: WeatherApp.notifierList,
        }
    }
}

$(document).ready(() => {
    $('#weatherAppModal').on('shown.bs.modal', () => {
        const scrollBarSize = GameHelper.isOverflownX('#forecastTable') ? GameHelper.getScrollBarSize() : 0;
        $('#timeTable').css('padding-bottom', scrollBarSize);
    });
});
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

    public static defaultDateRange: number = 7;

    public static generateAllRegionsForecast() {
        GameHelper.enumNumbers(Region).forEach((r: Region) => {
            WeatherApp.generateRegionalForecast(r);
        });
    }

    public static generateRegionalForecast(region: Region, dateRange: number = WeatherApp.defaultDateRange, date: Date = new Date()) {
        const weatherForecastList = [];
        const regionalForecast = WeatherApp.fullForecast()[region];
        // Creates forecasts for X hour
        for (let hour = 0; hour <= 23; hour += Weather.period) {
            const hourForecast = [];
            const newDate = new Date(date.setHours(hour, 0, 0, 0));
            // Gets the weather for every day for that hour
            for (let i = 0; i < dateRange; i++) {
                const weatherForecastDate = new Date(newDate).toLocaleString();
                // If a weather forecast (WF) for that region and that date exists in the notifier list, push that WF, otherwise, create a new WF
                const weatherForecast = regionalForecast?.notifierList.find((wf) => wf.date === weatherForecastDate) || 
                    new WeatherForecast(weatherForecastDate, Weather.getWeather(newDate, region));
                    hourForecast.push(weatherForecast);
                newDate.setDate(newDate.getDate() + 1);
            }
            weatherForecastList.push(hourForecast);
        }
        // If a regional forecast (RF) exists, replaces the weather forecast list on said RF, otherwise, creates a new RF
        if (regionalForecast) {
            regionalForecast.weatherForecastList(weatherForecastList);
        } else {
            WeatherApp.addRegionalForecast(new RegionalForecast(region, weatherForecastList));
        }
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
        let exist = false;
        WeatherApp.fullForecast().map((rf) => {
            if (rf.region === regionalForecast.region) {
                rf.weatherForecastList([]);
                rf.weatherForecastList(regionalForecast.weatherForecastList());
                exist = true;
            }
        });
        if (!exist) {
            WeatherApp.fullForecast().push(regionalForecast);
        }
    }

    public static checkDateHasPassed() {
        const now = new Date();
        WeatherApp.fullForecast().forEach((rf) => {
            // Full forecast
            // Set status to hasPassed if weather end date has passed already
            rf.weatherForecastList().flat().map((wf) => {
                const weatherEndDate = new Date(new Date(wf.date).setHours(new Date(wf.date).getHours() + Weather.period, 0, 0, 0))
                if (now > weatherEndDate) {
                    wf.setStatusHasPassed();
                }
            });
            // Notifier list
            rf.removeOldDates();
        });
    }

    public static setNotifier(weatherForecast: WeatherForecast, region: Region) {
        const regionalForecast = WeatherApp.fullForecast()[region];
        regionalForecast.toggleNotifier(weatherForecast);
        weatherForecast.toggle();
    }

    public static getWeatherNotification() {
        const now = new Date();
        Object.values(WeatherApp.fullForecast()).forEach((rf: RegionalForecast) => {
            rf.notifierList.forEach((wf) => {
                const notifierDate = new Date(wf.date);
                const startDate = new Date(wf.date);
                const endDate = new Date(new Date(startDate).setHours(startDate.getHours() + Weather.period, 0, 0, 0));
                if (now >= startDate && now < endDate) {
                    const weatherDesc = Weather.weatherConditions[wf.weatherType].description.replace(/\.+$/, ""); // Remove all ending dots (for fog weather)
                    Notifier.notify({
                        title: `<img width="30" src="assets/images/weather/weatherapp/${WeatherApp.calculateCastformIcon(wf.weatherType)}.png"> Castform App`,
                        message: `${weatherDesc} in ${camelCaseToString(Region[rf.region])}`,
                        customBGColor: Weather.weatherConditions[wf.weatherType].color,
                        timeout: 30 * MINUTE,
                    });
                }
            });
        });
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
        const notifierList: Record<Region, Array<WeatherForecast>> = json.notifierList;
        Object.entries(notifierList).forEach(([region, wfList]) => {
            const weatherForecastList = [];
            wfList.forEach((wf) => {
                weatherForecastList.push(new WeatherForecast(wf.date, wf.weatherType, WeatherForecastStatus.enabled));
            });
            WeatherApp.addRegionalForecast(new RegionalForecast(+region, [], weatherForecastList))
        });

    }

    toJSON() {
        const notifierList = {};
        WeatherApp.fullForecast().forEach((rf: RegionalForecast) => {
            if (rf.notifierList) {
                notifierList[rf.region] = rf.notifierList;
            }
        });
        return {
            selectedRegion: WeatherApp.selectedRegion(),
            notifierList: notifierList,
        }
    }
}

$(document).ready(() => {
    $('#weatherAppModal').on('shown.bs.modal', () => {
        const scrollBarSize = GameHelper.isOverflownX('#forecastTable') ? GameHelper.getScrollBarSize() : 0;
        $('#timeTable').css('padding-bottom', scrollBarSize);
    });
});
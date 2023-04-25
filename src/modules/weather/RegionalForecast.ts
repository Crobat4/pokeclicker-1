
import WeatherForecast from './WeatherForecast';
import { Region } from '../GameConstants';
import Weather from './Weather';
import { ObservableArray } from 'knockout';


export default class RegionalForecast {
    public region: Region;
    public weatherForecastList: ObservableArray<Array<WeatherForecast>>;
    public notifierList: Array<WeatherForecast>;

    constructor(
        region: Region,
        weatherForecastList: Array<Array<WeatherForecast>> = [],
        notifierList: Array<WeatherForecast> = [],
    ) {
        this.region = region;
        this.weatherForecastList = ko.observableArray(weatherForecastList);
        this.notifierList = notifierList;
    }

    toggleNotifier(weatherForecast: WeatherForecast) {
        if (!(this.notifierList.find((wf) => wf.date === weatherForecast.date))) {
            this.notifierList.push(weatherForecast);
        } else { // Remove the weather forecast
            this.notifierList = this.notifierList.filter((wf) => !(wf.date === weatherForecast.date));
        }
    }

    removeOldDates() {
        const now = new Date();
        this.notifierList = this.notifierList.filter((wf) => {
            const endDate = new Date(new Date(wf.date).setHours(new Date(wf.date).getHours() + Weather.period, 0, 0, 0));
            return now < endDate;
        });
    }
}
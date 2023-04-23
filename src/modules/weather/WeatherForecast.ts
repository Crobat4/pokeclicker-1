import { Observable } from 'knockout';
import WeatherForecastStatus from '../enums/WeatherForecastStatus';
import WeatherType from './WeatherType';
import { Region } from '../GameConstants';

export default class WeatherForecast {
    public region: Region;
    public date: string;
    public weatherType: WeatherType;
    public status: Observable<WeatherForecastStatus>

    constructor(
        region: Region,
        date: string,
        weatherType: WeatherType,
        status = WeatherForecastStatus.disabled,
    ) {
        this.region = region;
        this.date = date;
        this.weatherType = weatherType;
        this.status = ko.observable(status);
    }

    toggleStatusEnabledDisabled() {
        if (this.status() === WeatherForecastStatus.disabled) {
            this.status(WeatherForecastStatus.enabled);
        } else if (this.status() === WeatherForecastStatus.enabled) {
            this.status(WeatherForecastStatus.disabled);
        }
    }
    setStatusHasPassed() {
        this.status(WeatherForecastStatus.hasPassed);
    }
}
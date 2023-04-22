
import WeatherForecast from './WeatherForecast';
import { Region } from '../GameConstants';


export default class RegionalForecast {
    public region: Region;
    public regionalForecast: Array<Array<WeatherForecast>>;

    constructor(
        region: Region,
        regionalForecast: Array<Array<WeatherForecast>>,
    ) {
        this.region = region;
        this.regionalForecast = regionalForecast;
    }
}
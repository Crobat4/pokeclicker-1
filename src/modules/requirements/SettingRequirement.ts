import * as GameConstants from '../GameConstants';
import Settings from '../settings/Settings';
import Requirement from './Requirement';

export default class SettingRequirement extends Requirement {
    public setting: string;
    constructor(setting: string, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option);
        this.setting = setting;
    }

    public getProgress() {
        return Settings.getSetting(this.setting).observableValue();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Requires the respective setting to be enabled.';
    }
}

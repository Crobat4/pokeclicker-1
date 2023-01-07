import {
    Observable as KnockoutObservable,
} from 'knockout';
import PokemonType from '../enums/PokemonType';
import * as GameConstants from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';

export default class Challenge {
    public active: KnockoutObservable<boolean>;
    public pokemonType: KnockoutObservable<PokemonType>;

    constructor(
        public type: string,
        public description: string,
        active = false,
        pokemonType = PokemonType.Normal, // For monotype challenge
        public requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    ) {
        this.active = ko.observable(active);
        this.pokemonType = ko.observable(pokemonType);
    }

    activate(): void {
        this.active(true);
    }

    async disable(): Promise<void> {
        // If the player hasn't selected a starter yet, no need to confirm
        if (player.regionStarters[GameConstants.Region.kanto]() === GameConstants.Starter.None) {
            this.active(false);
            return;
        }

        if (this.requirement && !this.requirement.isCompleted()) {
            // If challenge can't be disabled yet, give a message
            Notifier.notify({
                message: `You can't disable this challenge yet.\n${this.requirement.hint()}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        } else {
            // Confirm they want to disable the challenge mode
            if (await Notifier.confirm({
                title: `Disable "${this.type}" challenge`,
                message: 'Are you sure you want to disable this challenge?\n\nOnce disabled, you will not be able to enable it again later!',
            })) {
                this.active(false);
            }
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}

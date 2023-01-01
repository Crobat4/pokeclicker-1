import {
    Observable as KnockoutObservable,
} from 'knockout';
import PokemonType from '../enums/PokemonType';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';

export default class Challenge {
    public active: KnockoutObservable<boolean>;
    public pokemonType: KnockoutObservable<PokemonType>;

    constructor(
        public type: string,
        public description: string,
        active = false,
        pokemonType = PokemonType.None, // For monotype challenge
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

        // Confirm they want to disable the challenge mode
        if (await Notifier.confirm({
            title: `Disable "${this.type}" challenge`,
            message: 'Are you sure you want to disable this challenge?\n\nOnce disabled, you will not be able to enable it again later!',
        })) {
            this.active(false);
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}

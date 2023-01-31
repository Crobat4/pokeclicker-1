import PokemonType from "../enums/PokemonType";
import Challenge from "./Challenge";

export default class MonotypeChallenge extends Challenge {
    public pokemonType: KnockoutObservable<PokemonType>;

    constructor(type: string, description: string, pokemonType = PokemonType.Normal) {
        super(type, description);
        this.pokemonType = ko.observable(pokemonType);
    }
}
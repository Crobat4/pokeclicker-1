import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static toggleStatisticShiny = ko.observable(false);
    public static toggleAllShiny = ko.observable(false);
    public static showAllPokemon = ko.observable(false);
    public static toggleFemale = ko.observable(false);

    public static isModalOpen: KnockoutObservable<boolean> = ko.observable(false);

    // For showing 50 more Pokémon when scrolling
    //public static scrollIndex: KnockoutObservable<number> = ko.observable(0);

    public static getBackgroundColors(name: PokemonNameType): string {
        const pokemon = PokemonHelper.getPokemonByName(name);

        if (!this.pokemonSeen(pokemon.id)()) {
            return 'grey';
        }
        if (pokemon.type2 == PokemonType.None) {
            return TypeColor[pokemon.type1];
        }
        return `linear-gradient(90deg,${TypeColor[pokemon.type1]} 50%, ${TypeColor[pokemon.type2]} 50%)`;
    }

    /**
     * Returns true if you have seen the pokemon
     * @param {number} id
     * @returns {boolean}
     */
    public static pokemonSeen(id: number): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            try {
                return App.game.statistics.pokemonEncountered[id]() > 0 || App.game.statistics.pokemonDefeated[id]() > 0 || App.game.statistics.pokemonCaptured[id]() > 0 || App.game.party.alreadyCaughtPokemon(id);
            } catch (error) {
                return false;
            }
        });
    }

    public static pokemonSeenByName(name: PokemonNameType): KnockoutComputed<boolean> {
        return this.pokemonSeen(PokemonHelper.getPokemonByName(name).id);
    }

    public static filteredList: KnockoutObservableArray<Record<string, any>> = ko.observableArray([]);

    public static populateFilters() {
        let options = $('#pokedex-filter-type1');
        $.each(PokemonType, function () {
            if (isNaN(Number(this)) && this != PokemonType.None) {
                options.append($('<option />').val(PokemonType[this]).text(this));
            }
        });

        options = $('#pokedex-filter-type2');
        $.each(PokemonType, function () {
            if (isNaN(Number(this)) && this != PokemonType.None) {
                options.append($('<option />').val(PokemonType[this]).text(this));
            }
        });

        options = $('#pokedex-filter-region');
        for (let i = 0; i <= GameConstants.MAX_AVAILABLE_REGION; i++) {
            options.append($('<option />').val(i).text(GameConstants.camelCaseToString(GameConstants.Region[i])));
        }
    }

    // Shows 50 Pokémon at first
    /*
    public static shortenedListByIndex(id = 0) {
        return this.showAllPokemon() ? this.filteredList() : this.filteredList().slice(0, (this.scrollIndex() * 50));
    }
    // Adds 50 more Pokémon on scroll
    public static addPokemonItem() {
        this.setScrollIndex(this.scrollIndex() + 1);
    }
    public static setScrollIndex(index: number): void {
        this.scrollIndex(index);
    }
    */

    public static updateList() {
        /*
        $('#pokemon-list').scrollTop(0);
        PokedexHelper.scrollIndex(1);
        */
        PokedexHelper.filteredList(PokedexHelper.getList());
        $('#pokemon-list').scrollTop(0);
        /*
        PokedexHelper.isModalOpen(false);
        if ($('#pokemon-list .loader-pokeball').length > 1) {
            $('#pokemon-list .loader-pokeball').first().remove();
        }
        setTimeout(() => {
            PokedexHelper.isModalOpen(true)
        }, 2000);
        */
    }

    public static getList(): Array<Record<string, any>> {
        const filter: Record<string, any> = PokedexHelper.getFilters();

        const highestEncountered = App.game.statistics.pokemonEncountered.highestID;
        const highestDefeated = App.game.statistics.pokemonDefeated.highestID;
        const highestCaught = App.game.statistics.pokemonCaptured.highestID;
        const highestDex = Math.max(highestEncountered, highestDefeated, highestCaught);

        return pokemonList.filter((pokemon) => {
            // Checks based on caught/shiny status
            const alreadyCaught = App.game.party.alreadyCaughtPokemon(pokemon.id);
            const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(pokemon.id, true);

            // If the Pokemon shouldn't be unlocked yet
            const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
            if (nativeRegion > GameConstants.MAX_AVAILABLE_REGION || nativeRegion == GameConstants.Region.none) {
                return false;
            }

            // If not showing this region
            const region: (GameConstants.Region | null) = filter.region ? parseInt(filter.region, 10) : null;
            if (region != null && region != nativeRegion) {
                return false;
            }

            // Event Pokemon
            if (pokemon.id <= 0 && !alreadyCaught) {
                return false;
            }

            // If we haven't seen a pokemon this high yet
            if (pokemon.id > highestDex) {
                return false;
            }

            // Check if the name contains the string
            if (filter.name && !pokemon.name.toLowerCase().includes(filter.name.toLowerCase().trim())) {
                return false;
            }

            // Check if either of the types match
            const type1: (PokemonType | null) = filter.type1 ? parseInt(filter.type1, 10) : null;
            const type2: (PokemonType | null) = filter.type2 ? parseInt(filter.type2, 10) : null;
            if ([type1, type2].includes(PokemonType.None)) {
                const type = (type1 == PokemonType.None) ? type2 : type1;
                if (!PokedexHelper.isPureType(pokemon, type)) {
                    return false;
                }
            } else if ((type1 != null && !(pokemon as PokemonListData).type.includes(type1)) || (type2 != null && !(pokemon as PokemonListData).type.includes(type2))) {
                return false;
            }

            // Alternate forms that we haven't caught yet
            if (!alreadyCaught && pokemon.id != Math.floor(pokemon.id)) {
                return false;
            }

            // Only uncaught
            if (filter['caught-shiny'] == 'uncaught' && alreadyCaught) {
                return false;
            }

            // All caught
            if (filter['caught-shiny'] == 'caught' && !alreadyCaught) {
                return false;
            }

            // Only caught not shiny
            if (filter['caught-shiny'] == 'caught-not-shiny' && (!alreadyCaught || alreadyCaughtShiny)) {
                return false;
            }

            // Only caught shiny
            if (filter['caught-shiny'] == 'caught-shiny' && !alreadyCaughtShiny) {
                return false;
            }

            /* Only base form if alternate exist (Zarbi, Basculin, ...)
             * if Mega are not alternative pokemon, this work
             * else change condition by `filter['hide-alternate'] && (!Number.isInteger(pokemon.id) || Math.sign(pokemon.id) === -1)`
             */
            if (filter['hide-alternate'] && !Number.isInteger(pokemon.id)) {
                return false;
            }

            // Only pokemon with a hold item
            if (filter['held-item'] && !BagHandler.displayName((pokemon as PokemonListData).heldItem)) {
                return false;
            }

            // Only pokemon uninfected by pokerus || None
            if (filter['status-pokerus'] != -1 && filter['status-pokerus'] != App.game.party.getPokemon(pokemon.id)?.pokerus) {
                return false;
            }

            // Only pokemon with gender differences
            if (filter['gender-diff'] && !(pokemon as PokemonListData).gender.difference) {
                return false;
            }

            return true;
        });
    }

    private static getFilters() {
        const res: Record<string, any> = {};
        res.name = $('#nameFilter').val();
        res.type1 = $('#pokedex-filter-type1').val();
        res.type2 = $('#pokedex-filter-type2').val();
        res.region = $('#pokedex-filter-region').val();
        res['caught-shiny'] = $('#pokedex-filter-shiny-caught').val();
        res['status-pokerus'] = $('#pokedex-filter-pokerus-status').val();
        res['held-item'] = $('#pokedex-filter-held-item').is(':checked');
        res['hide-alternate'] = $('#pokedex-filter-hide-alternate').is(':checked');
        res['gender-diff'] = $('#pokedex-filter-gender-diff').is(':checked');
        return res;
    }

    // Gender ratio
    public static getGenderRatioData(pokemon) {
        const genderType = pokemon.gender.type;
        const genderRatio = pokemon.gender.femaleRatio;
        const genderObject = {'male': 0, 'female': 0};
        // console.log(pokemon);
        genderObject.male = 100 - (100 * genderRatio);
        genderObject.female = 100 * genderRatio;
        return genderObject;
    }

    private static isPureType(pokemon: PokemonListData, type: (PokemonType | null)): boolean {
        return (pokemon.type.length === 1 && (type == null || pokemon.type[0] === type));
    }
}

$(document).ready(() => {
    $('#pokemonStatisticsModal').on('hidden.bs.modal', () => {
        PokedexHelper.toggleStatisticShiny(false);
    });
    // Adds 50 more Pokémon
    /*
    $('#pokemon-list').on('scroll', () => {
        const scrollY = $('#pokemon-list').scrollTop();
        const divHeight = $('#pokemon-elements').height();
        if (scrollY >= divHeight - 500) {
            PokedexHelper.addPokemonItem();
        }
    });

    // Reset to 50 Pokémon when Pokédex modal closes
    $('#pokedexModal').on('hidden.bs.modal', () => {
        PokedexHelper.scrollIndex(1);
    });
    // Show All Pokémon toggle
    $('#pokedex-filter-show-all').on('click', () => {
        $('#pokemon-list').scrollTop(0);
        if ($('#pokedex-filter-show-all').is(':checked')) {
            PokedexHelper.showAllPokemon(true);
        } else {
            PokedexHelper.scrollIndex(1);
            PokedexHelper.showAllPokemon(false);
        }

    });
    */
    $('#pokedexModal').on('shown.bs.modal', () => {
        PokedexHelper.isModalOpen(true);
    });
    $('#pokedexModal').on('hidden.bs.modal', () => {
        PokedexHelper.isModalOpen(false);
        $('.loader-pokeball').remove();
    });
});

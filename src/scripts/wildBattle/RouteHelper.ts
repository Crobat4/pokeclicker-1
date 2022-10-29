///<reference path="../../declarations/routes/Routes.d.ts"/>
///<reference path="../../declarations/routes/RoutePokemon.d.ts"/>

/**
 * Helper class to retrieve information from RoutePokemon
 */
class RouteHelper {
    public static route = ko.observable(1);
    public static region = ko.observable(1);
    /**
     * Retrieves a list of all Pokémon that can be caught on that route.
     * @param route
     * @param region
     * @param includeHeadbutt
     * @returns {string[]} list of all Pokémon that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region, includeHeadbutt = true, includeEggExclusive = true): PokemonNameType[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        const possiblePokemons = Routes.getRoute(region, route)?.pokemon;
        if (!possiblePokemons) {
            return ['Rattata'];
        }

        // Land Pokémon
        let pokemonList = possiblePokemons.land;

        // Water Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.Super_rod) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }

        // Headbutt Pokémon
        if (includeHeadbutt) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }

        // Egg Exclusive Pokémon
        if (includeEggExclusive) {
            pokemonList = pokemonList.concat(possiblePokemons.eggExclusive);
        }

        // Johto Pokémon native from Kanto (Houndour, Murkrow, Slugma)
        if (App.game.badgeCase.hasBadge(BadgeEnums.Elite_JohtoChampion)) {
            pokemonList = pokemonList.concat(possiblePokemons.afterJohtoLeague);
        }

        // Special requirement Pokémon
        pokemonList = pokemonList.concat(...possiblePokemons.special.filter(p => p.isAvailable()).map(p => p.pokemon));

        return pokemonList;
    }

    /**
     * Checks if all Pokémon on this route are caught by the player.
     * @param route
     * @param region
     * @param includeShiny
     * @param includeHeadbutt
     * @returns {boolean} true if all Pokémon on this route are caught.
     */

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean, includeHeadbutt = true): boolean {
        return RouteHelper.listCompleted(RouteHelper.getAvailablePokemonList(route, region, includeHeadbutt), includeShiny);
    }

    public static listCompleted(possiblePokemon: PokemonNameType[], includeShiny: boolean) {
        for (let i = 0; i < possiblePokemon.length; i++) {
            if (!App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(possiblePokemon[i]).id)) {
                return false;
            }
            if (includeShiny && !App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(possiblePokemon[i]).id, true)) {
                return false;
            }
        }
        return true;
    }

    public static minPokerus(possiblePokemon: PokemonNameType[]): number {
        let pokerus = 3;
        for (let i = 0; i < possiblePokemon.length; i++) {
            const pokerusStatus = App.game.party.getPokemonByName(possiblePokemon[i])?.pokerus;
            pokerus = Math.min(pokerus, pokerusStatus);
        }
        return pokerus;
    }

    public static minPokerusCheck(possiblePokemon: PokemonNameType[]): boolean {
        if (possiblePokemon.length == 0) {
            return false;
        }
        return this.minPokerus(possiblePokemon) > 0;
    }

    public static isAchievementsComplete(route: number, region: GameConstants.Region) {
        return AchievementHandler.achievementList.every(achievement => {
            return !(achievement.property instanceof RouteKillRequirement && achievement.property.region === region && achievement.property.route === route && !achievement.isCompleted());
        });
    }

    public static isThereQuestAtLocation(route: number, region: GameConstants.Region) {
        return App.game.quests.currentQuests().some(q => {
            return q instanceof DefeatPokemonsQuest && q.route == route && q.region == region;
        });
    }

    // Remove duplicates AKA Wingull
    public static sanitizedPokemonList(route: number, region: GameConstants.Region){
        return [...new Set(this.getAvailablePokemonList(route, region))];
    }

    // TODO: Move all this to a proper template
    public static getAvailablePokemonListForTooltip(route: number, region: GameConstants.Region) {
        const possiblePokemon = this.getAvailablePokemonList(route, region);
        const possiblePokemonSanitized = [...new Set(possiblePokemon)]; // Remove duplicates AKA Wingull
        let pokeballFilename = '';
        let pokemonName = '';
        let pokemonListString = '';
        let invertClass = '';
        pokemonListString += '<strong>Available Pokémon</strong>';
        pokemonListString += '<table class="w-100">';
        for (const pokemon of possiblePokemonSanitized) {
            pokemonListString += '<tr>';
            pokemonName = pokemon;
            invertClass = '';
            switch (PartyController.getCaughtStatusByName(pokemon)) {
                case CaughtStatus.NotCaught:
                    pokeballFilename = 'None';
                    if (!PokedexHelper.pokemonSeenByName(pokemon)()) {
                        pokemonName = '???';
                    }
                    invertClass = 'filter-invert';
                    break;
                case CaughtStatus.Caught:
                    pokeballFilename = 'Pokeball';
                    break;
                case CaughtStatus.CaughtShiny:
                    pokeballFilename = 'Pokeball-shiny';
                    break;
                default: console.error('Invalid Caught Status');
            }
            pokemonListString += `<td class="text-left">${pokemonName}</td>`;
            pokemonListString += `<td class="text-right"><img class="pokeball-smallest ${invertClass}" src="assets/images/pokeball/${pokeballFilename}.svg" /></td>`;
            if (App.game.party.getPokemonByName(pokemon)?.pokerus > GameConstants.Pokerus.Uninfected) {
                const pokerusFilename = GameConstants.Pokerus[App.game.party.getPokemonByName(pokemon)?.pokerus];
                pokemonListString += `<td><img src="assets/images/breeding/pokerus/${pokerusFilename}.png"/></td>`;
            }
            pokemonListString += '</tr>';
        }
        pokemonListString += '</table>';
        return pokemonListString;
    }
}

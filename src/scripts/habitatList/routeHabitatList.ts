class RouteHabitatList {
    private static route = ko.observable(-1);
    private static cachedPokemonList;
    public static pokemonList = ko.pureComputed(() => {
        if (RouteHabitatList.cachedPokemonList && modalUtils.observableState.routeHabitatListModal !== 'show') {
            return RouteHabitatList.cachedPokemonList;
        }

        if (RouteHabitatList.route() !== player.route()) {
            RouteHabitatList.cachedPokemonList = RouteHabitatList.getPokemonList();
            RouteHabitatList.route(player.route());
        }
        return RouteHabitatList.cachedPokemonList;
    });

    public static getPokemonList() {
        const route = player.route();
        const region = player.region;
        const subregion = player.subregion;

        const pokemonArray = [];
        const roamerGroup = RoamingPokemonList.findGroup(region, subregion);
        const roamingList = RoamingPokemonList.getSubRegionalGroupRoamers(region, roamerGroup);
        [...new Set(RouteHelper.getAvailablePokemonList(route, region))].forEach(pokemonName => {
            pokemonArray.push({name: pokemonName, roamer: false});
        });
        if (roamingList.length) {
            [...new Set(RoamingPokemonList.getSubRegionalGroupRoamers(region, roamerGroup))].forEach(pokemon => {
                pokemonArray.push({name: pokemon.pokemonName, roamer: true});
            });
        }
        return pokemonArray;
    }

    public static getFullName() {
        return `${RouteHabitatList.getRouteName()} - ${RouteHabitatList.getRegionName()} (${RouteHabitatList.getSubregionName()})`;
    }

    private static getRouteName() {
        return Routes.getName(player.route(), player.region);
    }

    private static getRegionName() {
        return GameConstants.camelCaseToString(GameConstants.Region[player.region]);
    }

    private static getSubregionName() {
        return player.subregionObject()?.name;
    }
}

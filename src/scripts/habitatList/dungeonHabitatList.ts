class DungeonHabitatList {
    public static pokemonList = ko.pureComputed(() => {
        return DungeonHabitatList.allEnemiesDungeon();
    });

    public static lootList = ko.pureComputed(() => {
        return DungeonHabitatList.getLootList();
    });

    private static getLootList() {
        return player.town.dungeon?.lootTable || [];
    }

    public static allEnemiesDungeon() {
        const town = player.town;
        return town.dungeon?.normalEncounterList.concat(town.dungeon?.bossEncounterList) || [];
    }

    public static getFullName() {
        return `${DungeonHabitatList.getDungeonName()} - ${DungeonHabitatList.getRegionName()} (${DungeonHabitatList.getSubregionName()})`;
    }

    private static getDungeonName() {
        return player.town.name;
    }

    private static getRegionName() {
        return GameConstants.camelCaseToString(GameConstants.Region[player.region]);
    }

    private static getSubregionName() {
        return player.subregionObject()?.name;
    }

    private static getShadowStauts() {
        return player.town.dungeon?.allAvailableShadowPokemon().some(p => App.game.party.getPokemonByName(p)?.shadow < GameConstants.ShadowStatus.Shadow);
    }

    public static getLootImage(input) {
        switch (true) {
            case typeof BerryType[input] == 'number':
                return FarmController.getBerryImage(BerryType[GameConstants.humanifyString(input)]);
            case UndergroundItems.getByName(input) instanceof UndergroundItem:
                return UndergroundItems.getByName(input).image;
            case PokemonHelper.getPokemonByName(input).name != 'MissingNo.':
                return `assets/images/pokemon/${PokemonHelper.getPokemonByName(input).id}.png`;
            // case ItemList[input] instanceof PokeballItem || MegaStoneItem || EvolutionStone || EggItem || BattleItem || Vitamin || EnergyRestore:
            default:
                return ItemList[input].image;
        }
    }

    public static getLootName(input) {
        switch (true) {
            case input in ItemList:
                return ItemList[input]?.displayName;
            case typeof BerryType[input] == 'number':
                return `${input} Berry`;
            case PokemonHelper.getPokemonByName(input).name != 'MissingNo.':
                return PokemonHelper.displayName(input)();
            default:
                return GameConstants.camelCaseToString(GameConstants.humanifyString(input.toLowerCase()));
        }
    }
}

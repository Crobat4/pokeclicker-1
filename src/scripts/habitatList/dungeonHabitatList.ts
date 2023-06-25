class DungeonHabitatList {
    private static dungeon = ko.observable('');
    private static cachedPokemonList;
    public static pokemonList = ko.pureComputed(() => {
        if (DungeonHabitatList.cachedPokemonList && modalUtils.observableState.dungeonHabitatListModal !== 'show') {
            return DungeonHabitatList.cachedPokemonList;
        }

        if (DungeonHabitatList.dungeon() !== player.town().name) {
            DungeonHabitatList.cachedPokemonList = DungeonHabitatList.allEnemiesDungeon();
            DungeonHabitatList.dungeon(player.town().name);
        }
        return DungeonHabitatList.cachedPokemonList;
    });

    private static cachedLootList;
    public static lootList = ko.pureComputed(() => {
        if (DungeonHabitatList.cachedLootList && modalUtils.observableState.dungeonHabitatListModal !== 'show') {
            return DungeonHabitatList.cachedLootList;
        }

        if (DungeonHabitatList.dungeon() !== player.town().name) {
            DungeonHabitatList.cachedLootList = DungeonHabitatList.getLootList();
            DungeonHabitatList.dungeon(player.town().name);
        }
        return DungeonHabitatList.cachedLootList;
    });

    private static getLootList() {
        return player.town().dungeon.lootTable;
    }

    public static allEnemiesDungeon() {
        const town = player.town();
        return town.dungeon.normalEncounterList.concat(town.dungeon.bossEncounterList);
    }

    public static getFullName() {
        return `${DungeonHabitatList.getDungeonName()} - ${DungeonHabitatList.getRegionName()} (${DungeonHabitatList.getSubregionName()})`;
    }

    private static getDungeonName() {
        return player.town().name;
    }

    private static getRegionName() {
        return GameConstants.camelCaseToString(GameConstants.Region[player.region]);
    }

    private static getSubregionName() {
        return player.subregionObject()?.name;
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

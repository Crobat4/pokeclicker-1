import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { MegaStoneType, Region, StoneType } from '../GameConstants';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import Rand from '../utilities/Rand';
import UndergroundEvolutionItem from './UndergroundEvolutionItem';
import UndergroundGemItem from './UndergroundGemItem';
import UndergroundItem from './UndergroundItem';
import UndergroundMegaStoneItem from './UndergroundMegaStoneItem';

export default class UndergroundItems {
    public static list: Array<UndergroundItem> = [];

    public static addItem(item: UndergroundItem) {
        this.list.push(item);
    }

    public static getByName(name: string): UndergroundItem {
        return this.list.find((item) => item.name === name);
    }

    public static getById(id: number): UndergroundItem {
        return this.list.find((item) => item.id === id);
    }

    // Returns a random unlocked item
    public static getRandomItem(): UndergroundItem {
        const unlockedItems = this.list.filter((item) => item.isUnlocked());
        return Rand.fromWeightedArray(unlockedItems, unlockedItems.map((i) => i.getWeight())) || this.list[0];
    }

    public static getFullResourceName(item: UndergroundItem, amt: number): string {
        let output = '';
        const uItem = this.getById(item.id);
        switch (item.valueType) {
            case UndergroundItemValueType.Gem:
                output = `${PokemonType[uItem.type]} Gem`;
                break;
            default:
                output = UndergroundItemValueType[item.valueType];
        }
        if (amt > 1) {
            output += 's';
        }
        return output;
    }
}

// Weights
const diamondWeight = () => {
    let weight = 1;
    const megaStoneAmount = UndergroundItems.list.filter((items) => items instanceof UndergroundMegaStoneItem).filter((megaStoneItems) => megaStoneItems.getWeight() !== 0).length;
    if (player.highestRegion() >= Region.unova && megaStoneAmount === 0) {
        weight = 3;
    }
    return weight;
};
const evoStoneShardPlateWeight = () => {
    let weight = 1;
    const megaStoneAmount = UndergroundItems.list.filter((items) => items instanceof UndergroundMegaStoneItem).filter((megaStoneItems) => megaStoneItems.getWeight() !== 0).length;
    if (player.highestRegion() >= Region.unova && megaStoneAmount === 0) {
        weight = 0.5;
    }
    return weight;
};

// Diamond Items
UndergroundItems.addItem(new UndergroundItem('Rare Bone', 1, [[1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1]], 3, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Star Piece', 2, [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 5, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Revive', 3, [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Max Revive', 4, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 4, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Iron Ball', 5, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Heart Scale', 6, [[1, 0], [1, 1]], 10, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Light Clay', 7, [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 1]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Odd Keystone', 8, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 6, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Hard Stone', 9, [[1, 1], [1, 1]], 4, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Oval Stone', 10, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Everstone', 11, [[1, 1, 1, 1], [1, 1, 1, 1]], 3, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Smooth Rock', 12, [[0, 0, 1, 0], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 0]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Heat Rock', 13, [[1, 0, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Icy Rock', 14, [[0, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem('Damp Rock', 15, [[1, 1, 1], [1, 1, 1], [1, 0, 1]], 2, UndergroundItemValueType.Diamond, null, diamondWeight));

// Gem Plates
UndergroundItems.addItem(new UndergroundGemItem('Draco Plate', 100, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dragon, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Dread Plate', 101, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dark, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Earth Plate', 102, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ground, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Fist Plate', 103, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fighting, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Flame Plate', 104, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fire, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Icicle Plate', 105, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ice, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Insect Plate', 106, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Bug, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Iron Plate', 107, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Steel, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Meadow Plate', 108, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Grass, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Mind Plate', 109, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Psychic, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Sky Plate', 110, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Flying, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Splash Plate', 111, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Water, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Spooky Plate', 112, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ghost, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Stone Plate', 113, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Rock, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Toxic Plate', 114, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Poison, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Zap Plate', 115, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Electric, 100, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem('Pixie Plate', 116, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fairy, 100, null, evoStoneShardPlateWeight));

// Fossils/Fossil Pieces
UndergroundItems.addItem(new UndergroundItem('Helix Fossil', 200, [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Omanyte') || player.getUndergroundItemAmount(200) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Dome Fossil', 201, [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Kabuto') || player.getUndergroundItemAmount(201) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Old Amber', 202, [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Aerodactyl') || player.getUndergroundItemAmount(202) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Root Fossil', 203, [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Lileep') || player.getUndergroundItemAmount(203) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Claw Fossil', 204, [[1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Anorith') || player.getUndergroundItemAmount(204) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Armor Fossil', 205, [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh),
    () => (App.game.party.alreadyCaughtPokemonByName('Shieldon') || player.getUndergroundItemAmount(205) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Skull Fossil', 206, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh),
    () => (App.game.party.alreadyCaughtPokemonByName('Cranidos') || player.getUndergroundItemAmount(206) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Cover Fossil', 207, [[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova),
    () => (App.game.party.alreadyCaughtPokemonByName('Tirtouga') || player.getUndergroundItemAmount(207) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Plume Fossil', 208, [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 0, 0, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova),
    () => (App.game.party.alreadyCaughtPokemonByName('Archen') || player.getUndergroundItemAmount(208) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Jaw Fossil', 209, [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos),
    () => (App.game.party.alreadyCaughtPokemonByName('Tyrunt') || player.getUndergroundItemAmount(209) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Sail Fossil', 210, [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos),
    () => (App.game.party.alreadyCaughtPokemonByName('Amaura') || player.getUndergroundItemAmount(210) > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Bird', 211, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracozolt') && App.game.party.alreadyCaughtPokemonByName('Arctozolt')) || player.getUndergroundItemAmount(211) > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Fish', 212, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracovish') && App.game.party.alreadyCaughtPokemonByName('Arctovish')) || player.getUndergroundItemAmount(211) > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Drake', 213, [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracozolt') && App.game.party.alreadyCaughtPokemonByName('Dracovish')) || player.getUndergroundItemAmount(211) > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem('Fossilized Dino', 214, [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Arctozolt') && App.game.party.alreadyCaughtPokemonByName('Arctovish')) || player.getUndergroundItemAmount(211) > 1 ? 1 : 2)));

// Evolution Stones
UndergroundItems.addItem(new UndergroundEvolutionItem('Fire Stone', 300, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Fire_stone, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Water Stone', 301, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Water_stone, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Thunder Stone', 302, [[0, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Thunder_stone, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Leaf Stone', 303, [[0, 1, 0], [1, 1, 1], [1, 1, 1], [0, 1, 0]], 1, StoneType.Leaf_stone, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Moon Stone', 304, [[0, 1, 1, 1], [1, 1, 1, 0]], 1, StoneType.Moon_stone, null, evoStoneShardPlateWeight));
// TODO: Replace these requirements with StoneUnlockedRequirement once moved to modules
UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], 1, StoneType.Sun_stone, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Shiny_stone, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Dusk_stone, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Dawn_stone, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], 1, StoneType.Ice_stone, new MaxRegionRequirement(Region.alola), evoStoneShardPlateWeight));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], 1, StoneType.Sun_stone, new StoneUnlockedRequirement(StoneType.Sun_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Shiny_stone, new StoneUnlockedRequirement(StoneType.Shiny_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Dusk_stone, new StoneUnlockedRequirement(StoneType.Dusk_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Dawn_stone, new StoneUnlockedRequirement(StoneType.Dawn_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], 1, StoneType.Ice_stone, new StoneUnlockedRequirement(StoneType.Ice_stone)));

// Shards
UndergroundItems.addItem(new UndergroundItem('Red Shard', 400, [[1, 1, 1], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Yellow Shard', 401, [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Green Shard', 402, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Blue Shard', 403, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Grey Shard', 404, [[1, 1, 1], [1, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Purple Shard', 405, [[1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Ochre Shard', 406, [[1, 1, 0, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hoenn), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Black Shard', 407, [[1, 1, 1], [0, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Crimson Shard', 408, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Lime Shard', 409, [[0, 0, 0, 0], [0, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('White Shard', 410, [[1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Pink Shard', 411, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.kalos), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Cyan Shard', 412, [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.alola), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Rose Shard', 413, [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem('Brown Shard', 414, [[1, 1, 0], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar), evoStoneShardPlateWeight));
//UndergroundItems.addItem(new UndergroundItem('Beige Shard', 415, [[0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hisui)));

// MegaStones
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Aerodactylite, 500, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Aerodactyl', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Mawilite, 501, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Mawile', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Sablenite, 502, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Sableye', 0, 0.1));

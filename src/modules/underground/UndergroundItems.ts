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

    public static getUnlockedItems(): UndergroundItem[] {
        return this.list.filter((item) => item.isUnlocked());
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
UndergroundItems.addItem(new UndergroundItem(1, 'Rare Bone', [[1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1]], 3, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(2, 'Star Piece', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 5, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(3, 'Revive', [[0, 1, 0], [1, 1, 1], [0, 1, 0]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(4, 'Max Revive', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 4, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(5, 'Iron Ball', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(6, 'Heart Scale', [[1, 0], [1, 1]], 10, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(7, 'Light Clay', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 1]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(8, 'Odd Keystone', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 6, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(9, 'Hard Stone', [[1, 1], [1, 1]], 4, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(10, 'Oval Stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 3, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(11, 'Everstone', [[1, 1, 1, 1], [1, 1, 1, 1]], 3, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(12, 'Smooth Rock', [[0, 0, 1, 0], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 0, 0]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(13, 'Heat Rock', [[1, 0, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(14, 'Icy Rock', [[0, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 0, 1]], 2, undefined, null, diamondWeight));
UndergroundItems.addItem(new UndergroundItem(15, 'Damp Rock', [[1, 1, 1], [1, 1, 1], [1, 0, 1]], 2, undefined, null, diamondWeight));

// Gem Plates
UndergroundItems.addItem(new UndergroundGemItem(100, 'Draco Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dragon, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(101, 'Dread Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Dark, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(102, 'Earth Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ground, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(103, 'Fist Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fighting, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(104, 'Flame Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fire, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(105, 'Icicle Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ice, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(106, 'Insect Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Bug, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(107, 'Iron Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Steel, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(108, 'Meadow Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Grass, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(109, 'Mind Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Psychic, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(110, 'Sky Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Flying, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(111, 'Splash Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Water, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(112, 'Spooky Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Ghost, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(113, 'Stone Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Rock, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(114, 'Toxic Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Poison, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(115, 'Zap Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Electric, undefined, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundGemItem(116, 'Pixie Plate', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], PokemonType.Fairy, undefined, null, evoStoneShardPlateWeight));

// Fossils/Fossil Pieces
UndergroundItems.addItem(new UndergroundItem(200, 'Helix Fossil', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Omanyte') || player.itemList.Helix_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(201, 'Dome Fossil', [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Kabuto') || player.itemList.Dome_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(202, 'Old Amber', [[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, null,
    () => (App.game.party.alreadyCaughtPokemonByName('Aerodactyl') || player.itemList.Old_amber() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(203, 'Root Fossil', [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Lileep') || player.itemList.Root_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(204, 'Claw Fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.hoenn),
    () => (App.game.party.alreadyCaughtPokemonByName('Anorith') || player.itemList.Claw_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(205, 'Armor Fossil', [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh),
    () => (App.game.party.alreadyCaughtPokemonByName('Shieldon') || player.itemList.Armor_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(206, 'Skull Fossil', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.sinnoh),
    () => (App.game.party.alreadyCaughtPokemonByName('Cranidos') || player.itemList.Skull_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(207, 'Cover Fossil', [[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova),
    () => (App.game.party.alreadyCaughtPokemonByName('Tirtouga') || player.itemList.Cover_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(208, 'Plume Fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 0, 0, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.unova),
    () => (App.game.party.alreadyCaughtPokemonByName('Archen') || player.itemList.Plume_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(209, 'Jaw Fossil', [[0, 0, 1, 1, 1], [0, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos),
    () => (App.game.party.alreadyCaughtPokemonByName('Tyrunt') || player.itemList.Jaw_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(210, 'Sail Fossil', [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [0, 1, 1, 1, 0]], 0, UndergroundItemValueType.Fossil, new MaxRegionRequirement(Region.kalos),
    () => (App.game.party.alreadyCaughtPokemonByName('Amaura') || player.itemList.Sail_fossil() > 0 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(211, 'Fossilized Bird', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracozolt') && App.game.party.alreadyCaughtPokemonByName('Arctozolt')) 
        || player.itemList.Fossilized_bird() > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(212, 'Fossilized Fish', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracovish') && App.game.party.alreadyCaughtPokemonByName('Arctovish')) 
        || player.itemList.Fossilized_fish() > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(213, 'Fossilized Drake', [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Dracozolt') && App.game.party.alreadyCaughtPokemonByName('Dracovish')) 
        || player.itemList.Fossilized_drake() > 1 ? 1 : 2)));
UndergroundItems.addItem(new UndergroundItem(214, 'Fossilized Dino', [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.FossilPiece, new MaxRegionRequirement(Region.galar),
    () => ((App.game.party.alreadyCaughtPokemonByName('Arctozolt') && App.game.party.alreadyCaughtPokemonByName('Arctovish')) 
        || player.itemList.Fossilized_dino() > 1 ? 1 : 2)));

// Evolution Stones
UndergroundItems.addItem(new UndergroundEvolutionItem(300, 'Fire Stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Fire_stone, 1, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(301, 'Water Stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Water_stone, 1, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(302, 'Thunder Stone', [[0, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Thunder_stone, 1, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(303, 'Leaf Stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1], [0, 1, 0]], StoneType.Leaf_stone, 1, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(304, 'Moon Stone', [[0, 1, 1, 1], [1, 1, 1, 0]], StoneType.Moon_stone, 1, null, evoStoneShardPlateWeight));
// TODO: Replace these requirements with StoneUnlockedRequirement once moved to modules
UndergroundItems.addItem(new UndergroundEvolutionItem(305, 'Sun Stone', [[0, 1, 0], [1, 1, 1], [1, 1, 1]], StoneType.Sun_stone, 1, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(306, 'Shiny Stone', [[0, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Shiny_stone, 1, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(307, 'Dusk Stone', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], StoneType.Dusk_stone, 1, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(308, 'Dawn Stone', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Dawn_stone, 1, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(309, 'Ice Stone', [[1, 1, 1], [1, 1, 1]], StoneType.Ice_stone, 1, new MaxRegionRequirement(Region.alola), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(310, 'Black_augurite', [[1, 0, 1], [1, 1, 1], [1, 1, 1]], StoneType.Black_augurite, 1, new MaxRegionRequirement(Region.hisui), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundEvolutionItem(311, 'Peat_block', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], StoneType.Peat_block, 1, new MaxRegionRequirement(Region.hisui), evoStoneShardPlateWeight));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Sun Stone', 305, [[0, 1, 0], [1, 1, 1], [1, 1, 1]], 1, StoneType.Sun_stone, new StoneUnlockedRequirement(StoneType.Sun_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Shiny Stone', 306, [[0, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Shiny_stone, new StoneUnlockedRequirement(StoneType.Shiny_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dusk Stone', 307, [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 1, StoneType.Dusk_stone, new StoneUnlockedRequirement(StoneType.Dusk_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Dawn Stone', 308, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, StoneType.Dawn_stone, new StoneUnlockedRequirement(StoneType.Dawn_stone)));
// UndergroundItems.addItem(new UndergroundEvolutionItem('Ice Stone', 309, [[1, 1, 1], [1, 1, 1]], 1, StoneType.Ice_stone, new StoneUnlockedRequirement(StoneType.Ice_stone)));

// Shards
UndergroundItems.addItem(new UndergroundItem(400, 'Red Shard', [[1, 1, 1], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(401, 'Yellow Shard', [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(402, 'Green Shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 1]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(403, 'Blue Shard', [[1, 1, 1], [1, 1, 1], [1, 1, 0]], 0, UndergroundItemValueType.Shard, null, evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(404, 'Grey Shard', [[1, 1, 1], [1, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(405, 'Purple Shard', [[1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.johto), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(406, 'Ochre Shard', [[1, 1, 0, 0], [1, 1, 1, 0], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.hoenn), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(407, 'Black Shard', [[1, 1, 1], [0, 1, 1], [0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(408, 'Crimson Shard', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(409, 'Lime Shard', [[0, 0, 0, 0], [0, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(410, 'White Shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.sinnoh), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(411, 'Pink Shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.kalos), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(412, 'Cyan Shard', [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.alola), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(413, 'Rose Shard', [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(414, 'Brown Shard', [[1, 1, 0], [1, 1, 0], [1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.galar), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(415, 'Beige_shard', [[0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.paldea), evoStoneShardPlateWeight));
UndergroundItems.addItem(new UndergroundItem(416, 'Slate_shard', [[0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 0, UndergroundItemValueType.Shard, new MaxRegionRequirement(Region.paldea), evoStoneShardPlateWeight));

// MegaStones
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Aerodactylite, 500, 'Aerodactylite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Aerodactyl', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Mawilite, 501, 'Mawilite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Mawile', 0, 0.1));
UndergroundItems.addItem(new UndergroundMegaStoneItem(MegaStoneType.Sablenite, 502, 'Sablenite', [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'Sableye', 0, 0.1));

import DayCyclePart from './dayCycle/DayCyclePart';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

// Ticks
export const TICK_TIME = 0.1 * SECOND;
export const BATTLE_TICK = 1 * SECOND;
export const BATTLE_FRONTIER_TICK = 0.5 * SECOND;
export const UNDERGROUND_TICK = 1 * SECOND;
export const DUNGEON_TIME = 60 * SECOND;
export const DUNGEON_TICK = 0.1 * SECOND;
export const DUNGEON_LADDER_BONUS = 10 * SECOND;
export const EFFECT_ENGINE_TICK = 1 * SECOND;
export const SAVE_TICK = 10 * SECOND;
export const GYM_TIME = 30 * SECOND;
export const GYM_COUNTDOWN = 1 * SECOND;
export const GYM_TICK = 0.1 * SECOND;
export const ACHIEVEMENT_TICK = 1 * SECOND;
export const MIN_LOAD_TIME = 0.5 * SECOND;
export const MAX_LOAD_TIME = 20 * SECOND;
export const MUTATION_TICK = 1 * SECOND;
export const WANDER_TICK = 1.5 * SECOND;
export const TEMP_BATTLE_TIME = 60 * SECOND;
export const TEMP_BATTLE_TICK = 0.1 * SECOND;

// Update the requirement for "Final Region Town" in TownList, when adding new regions.
// Else the professor NPC won't work.
export enum Region {
    none = -1,
    kanto = 0,
    johto = 1,
    hoenn = 2,
    sinnoh = 3,
    unova = 4,
    kalos = 5,
    alola = 6,
    galar = 7,
    // Throws an error if no region after the final region
    final = 8,
}

export const MAX_AVAILABLE_REGION = Region.galar;

export const MaxIDPerRegion = [
    151, // 151 - Kanto
    251, // 100 - Johto
    386, // 135 - Hoenn
    493, // 107 - Sinnoh
    649, // 156 - Unova
    721, // 72 - Kalos
    809, // 88 - Alola
    898, // 89 - Galar
];

// Subregions
export enum KantoSubRegions {
    Kanto = 0,
    Sevii123,
    Sevii4567,
}

export enum JohtoSubRegions {
    Johto = 0,
}

export enum HoennSubRegions {
    Hoenn = 0,
    Orre,
}

export enum SinnohSubRegions {
    Sinnoh = 0,
}

export enum UnovaSubRegions {
    Unova = 0,
}

export enum KalosSubRegions {
    Kalos = 0,
}

export enum AlolaSubRegions {
    MelemeleIsland = 0,
    AkalaIsland,
    UlaulaIsland,
    PoniIsland,
    MagikarpJump,
}

export enum GalarSubRegions {
    SouthGalar = 0,
    NorthGalar,
    IsleofArmor,
    CrownTundra,
}

export enum FinalSubRegions {
    Final = 0,
}

export type SubRegions =
    | KantoSubRegions
    | JohtoSubRegions
    | HoennSubRegions
    | SinnohSubRegions
    | UnovaSubRegions
    | KalosSubRegions
    | AlolaSubRegions
    | GalarSubRegions
    | FinalSubRegions;

// Battle Items
export const ITEM_USE_TIME = 30;
export const FLUTE_TYPE_ATTACK_MULTIPLIER = 1.005;

export const ROAMING_MIN_CHANCE = 8192;
export const ROAMING_MAX_CHANCE = 4096;

// Shinies
export const SHINY_CHANCE_BATTLE = 8192;
export const SHINY_CHANCE_DUNGEON = 4096;
export const SHINY_CHANCE_STONE = 2048;
export const SHINY_CHANCE_SAFARI = 1024;
export const SHINY_CHANCE_SHOP = 1024;
export const SHINY_CHANCE_BATTLEFRONTIER = 1024;
export const SHINY_CHANCE_BREEDING = 1024;
export const SHINY_CHANCE_FARM = 1024;
export const SHINY_CHANCE_REWARD = 1024;

export const ITEM_PRICE_MULTIPLIER = 1.00045;
export const ITEM_PRICE_DEDUCT = 1.0005;

export const PLATE_VALUE = 100;

// Breeding
export const EGG_CYCLE_MULTIPLIER = 40;
export const BREEDING_ATTACK_BONUS = 25;

// Farming
export const FARM_PLOT_WIDTH = 5;
export const FARM_PLOT_HEIGHT = 10;

export const BerryDistribution = [0.39, 0.63, 0.78, 0.87, 0.93, 0.96, 0.98, 1];

export const MULCH_USE_TIME = 300;
export const BOOST_MULCH_MULTIPLIER = 1.5;
export const RICH_MULCH_MULTIPLIER = 2;
export const SURPRISE_MULCH_MULTIPLIER = 1.5;
export const AMAZE_MULCH_GROWTH_MULTIPLIER = 1.25;
export const AMAZE_MULCH_PRODUCE_MULTIPLIER = 1.5;
export const AMAZE_MULCH_MUTATE_MULTIPLIER = 1.25;
export const FREEZE_MULCH_MULTIPLIER = 0;

export const WANDER_RATE = 0.0005;

export const BerryColor = [
    '#EE8130', // Red
    '#A33EA1', // Purple
    '#D685AD', // Pink
    '#7AC74C', // Green
    '#F7D02C', // Yellow
    '#6390F0', // Blue
    '#B1CBDC', // Silver placeholder
    '#FFE48E', // Gold placeholder
    '#B7B7CE', // Hinted
    '#1C1C1C', // Locked
];

// Dungeons
export const BASE_DUNGEON_SIZE = 5;
export const MIN_DUNGEON_SIZE = 5;
export const MAX_DUNGEON_SIZE = 10;
export const DUNGEON_CHEST_SHOW = 2;
export const DUNGEON_MAP_SHOW = 4;

export enum DungeonTile {
    empty = 0,
    entrance = 1,
    enemy = 2,
    chest = 3,
    boss = 4,
    ladder = 5,
}

// Achievements
export enum AchievementOption {
    less,
    equal,
    more,
}

export enum AchievementType {
    'None' = -1,
    'Pokedollars' = 0,
    'Dungeon Token',
    'Caught Pokemon',
    'Shiny Pokemon',
    'Total Captured',
    'Total Defeated',
    'Attack',
    'Poke Balls',
    'Route Defeats',
    'Clear Gym',
    'Clear Dungeon',
    'Quest',
    'Max Level Oak Item',
    'Hatchery',
    'Farming',
    'Underground',
    'Battle Frontier',
    'Vitamins',
    'Pokerus',
}

// Held item chance
export const ROUTE_HELD_ITEM_MODIFIER = 1;
export const DUNGEON_HELD_ITEM_MODIFIER = ROUTE_HELD_ITEM_MODIFIER * 4;
export const DUNGEON_BOSS_HELD_ITEM_MODIFIER = DUNGEON_HELD_ITEM_MODIFIER * 1.5;
export const HELD_ITEM_CHANCE = 512;
export const HELD_UNDERGROUND_ITEM_CHANCE = 2048;
export const GRISEOUS_ITEM_CHANCE = 80;
export const DNA_ITEM_CHANCE = 60;
export const LIGHT_ITEM_CHANCE = 100;
export const RUST_ITEM_CHANCE = 90;
export const MANE_ITEM_CHANCE = 10;

// Gems
export const GEM_UPGRADE_COST = 500;
export const GEM_UPGRADE_STEP = 0.1;
export const MAX_GEM_UPGRADES = 10;

// Gems from battle
export const DUNGEON_GEMS = 3;
export const DUNGEON_BOSS_GEMS = 20;
export const GYM_GEMS = 5;

// Safari Zone
export const SAFARI_BATTLE_CHANCE = 5;

export const SAFARI_BASE_POKEBALL_COUNT = 30;

export const LEGAL_WALK_BLOCKS = [
    0,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
];

export const SAFARI_OUT_OF_BALLS = 'Game Over!<br>You have run out of safari balls to use.';

// Quests

// Numbers calculated by Dimava assumes ability to 1 shot on high routes and some use oak items,
//   which are now nerfed slightly until upgraded, so those numbers may need further adjusting
const questBase = 1; // change this to scale all quest points

// Currency → QP reward amounts
export const GAIN_MONEY_BASE_REWARD = questBase * 0.0017;
export const GAIN_TOKENS_BASE_REWARD = GAIN_MONEY_BASE_REWARD * 55;
export const GAIN_FARM_POINTS_BASE_REWARD = GAIN_MONEY_BASE_REWARD * 90;

export const HATCH_EGGS_BASE_REWARD = questBase * 33;
export const SHINY_BASE_REWARD = questBase * 3000;

export const DEFEAT_POKEMONS_BASE_REWARD = questBase * 1;

// Defeat reward divided by chance to catch (guessed)
export const CAPTURE_POKEMONS_BASE_REWARD = DEFEAT_POKEMONS_BASE_REWARD / 0.74;

// Average of 1/4 squares revealed = 75 energy ~ 12 minutes ~ 720 pokemons
export const MINE_LAYERS_BASE_REWARD = questBase * 720;
export const MINE_ITEMS_BASE_REWARD = questBase * 210;

// not balanced at all for some oak items
export const USE_OAK_ITEM_BASE_REWARD = DEFEAT_POKEMONS_BASE_REWARD;

export const ACTIVE_QUEST_MULTIPLIER = 4;

// Some active quests may be quicker if passive pokemon attack is used instead of active clicking
// This number is used to estimate time taken in terms of clicks, for reward calculation
export const QUEST_CLICKS_PER_SECOND = 5;

export const QUESTS_PER_SET = 10;

// EVs
export const BASE_EP_YIELD = 100;
export const STONE_EP_YIELD = 1000;
export const WANDERER_EP_YIELD = 500;
export const SHOPMON_EP_YIELD = 1000;
export const SAFARI_EP_YIELD = 1000;

export const SHINY_EP_MODIFIER = 5;
export const REPEATBALL_EP_MODIFIER = 5;
export const DUNGEON_EP_MODIFIER = 3;
export const DUNGEON_BOSS_EP_MODIFIER = 10;
export const ROAMER_EP_MODIFIER = 50;

export const EP_EV_RATIO = 1000;
export const EP_CHALLENGE_MODIFIER = 10;

/**
 * idle: The game is not doing anything, the battle view isn't shown
 * paused: The battle view is shown, but there are no game ticks
 * fighting: On a route and battling a pokemon
 * gym: Battling a gym
 * dungeon: Exploring a dungeon
 * safari: Exploring the safari zone
 * town: In a town/pre-dungeon, town view is not shown
 */
export enum GameState {
    idle = 0,
    paused = 1,
    fighting = 2,
    gym = 3,
    dungeon = 4,
    safari = 5,
    town = 6,
    shop = 7,
    battleFrontier = 8,
    temporaryBattle = 9,
}

export enum Pokeball {
    'None' = -1,
    'Pokeball' = 0,
    'Greatball',
    'Ultraball',
    'Masterball',
    'Fastball',
    'Quickball',
    'Timerball',
    'Duskball',
    'Luxuryball',
    'Diveball',
    'Lureball',
    'Nestball',
    'Repeatball',
    'Beastball',
}

export enum Currency {
    money,
    questPoint,
    dungeonToken,
    diamond,
    farmPoint,
    battlePoint,
    contestToken,
}

export const LuxuryBallCurrencyRate: Record<Currency, number> = {
    [Currency.money]: 300000,
    [Currency.questPoint]: 900,
    [Currency.dungeonToken]: 15000,
    [Currency.diamond]: 15,
    [Currency.farmPoint]: 900,
    [Currency.battlePoint]: 150,
    [Currency.contestToken]: 900,
};

export enum TypeEffectiveness {
    Immune,
    NotVery,
    Neutral,
    Very,
}

export enum TypeEffectivenessValue {
    Immune = 0,
    NotVery = 0.5,
    Neutral = 1,
    Very = 2,
}

export function cleanHTMLString(str: string): string {
    return str.replace(/([|&;$%@"<>()+,])/g, (c: string) => `&#${c.charCodeAt(0)};`);
}

export function humanifyString(str: string): string {
    return str.replace(/[_-]+/g, ' ');
}

export function camelCaseToString(str: string): string {
    return str.replace(/[\s_-]?([A-Z])/g, ' $1').replace(/\b\w/g, (w) => (w.replace(/\w/, (c) => c.toUpperCase()))).trim();
}

export function pluralizeString(str: string, amt: number): string {
    if (amt <= 1) {
        return str;
    }

    switch (true) {
        case /s$/.test(str):
            return str;
        case /y$/.test(str):
            return str.replace(/y$/, 'ies');
        case /ch$/.test(str):
            return `${str}es`;
        default:
            return `${str}s`;
    }
}

export function formatDate(date: Date): string {
    return date.toISOString().replace(/T/, ' ').replace(/.\d+Z/, '');
}

export function formatTime(input: number | Date): string {
    if (input === 0) { return 'Ready'; }
    if (input === Infinity) { return '∞'; }

    const time = parseInt(`${input}`, 10); // don't forget the second param
    const hours: any = `${Math.floor(time / 3600)}`.padStart(2, '0');
    const minutes: any = `${Math.floor((time - (hours * 3600)) / 60)}`.padStart(2, '0');
    const seconds: any = `${time - (hours * 3600) - (minutes * 60)}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function formatTimeFullLetters(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
    let time = Math.abs(input * 1000);
    const times = [];

    if (time >= WEEK) {
        const weeks = Math.floor(time / WEEK);
        times.push(`${weeks}w`.padStart(3, '0'));
        time %= WEEK;
    }
    if (time >= DAY || times.length) {
        const days = Math.floor(time / DAY);
        times.push(`${days}d`.padStart(3, '0'));
        time %= DAY;
    }
    if (time >= HOUR || times.length) {
        const hours = Math.floor(time / HOUR);
        times.push(`${hours}h`.padStart(3, '0'));
        time %= HOUR;
    }
    if (time >= MINUTE || times.length) {
        const minutes = Math.floor(time / MINUTE);
        times.push(`${minutes}m`.padStart(3, '0'));
        time %= MINUTE;
    }
    if (time >= SECOND || times.length) {
        const seconds = Math.floor(time / SECOND);
        times.push(`${seconds}s`.padStart(3, '0'));
    }
    return times.slice(0, 3).join(' ');
}

export function formatTimeShortWords(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return 'now'; }
    const time = Math.abs(input);

    if (time > DAY) {
        const days = Math.ceil(time / DAY);
        return `${time % DAY ? '< ' : ''}${days} day${days === 1 ? '' : 's'}`;
    }
    if (time > HOUR) {
        const hours = Math.ceil(time / HOUR);
        return `${time % HOUR ? '< ' : ''}${hours} hour${hours === 1 ? '' : 's'}`;
    }
    const minutes = Math.ceil(time / MINUTE);
    return `${time % MINUTE ? '< ' : ''}${minutes} min${minutes === 1 ? '' : 's'}`;
}

export function formatSecondsToTime(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
    let time = Math.abs(input * 1000);
    const times = [];

    if (time >= WEEK) {
        const weeks = Math.floor(time / WEEK);
        times.push(`${weeks} week${weeks === 1 ? '' : 's'}`);
        time %= WEEK;
    }
    if (time >= DAY) {
        const days = Math.floor(time / DAY);
        times.push(`${days} day${days === 1 ? '' : 's'}`);
        time %= DAY;
    }
    if (time >= HOUR) {
        const hours = Math.floor(time / HOUR);
        times.push(`${hours} hour${hours === 1 ? '' : 's'}`);
        time %= HOUR;
    }
    if (time >= MINUTE) {
        const minutes = Math.floor(time / MINUTE);
        times.push(`${minutes} min${minutes === 1 ? '' : 's'}`);
        time %= MINUTE;
    }
    if (time >= SECOND) {
        const seconds = Math.floor(time / SECOND);
        times.push(`${seconds} sec${seconds === 1 ? '' : 's'}`);
    }
    return times.join('</br>');
}

export function formatNumber(input: number): string {
    let num = Number(input); // Temporary cast until everything is in modules
    if (Number.isNaN(+num)) { return '0'; }

    if (num >= 1e12) {
        num = Math.floor(num / 1e11);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}T`;
    }

    if (num >= 1e9) {
        num = Math.floor(num / 1e8);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}B`;
    }

    if (num >= 1e6) {
        num = Math.floor(num / 1e5);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}M`;
    }

    if (num >= 1e3) {
        num = Math.floor(num / 1e2);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}K`;
    }

    return num.toString();
}

export function clipNumber(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

// Return a random element from the array, with an exponential distribution
// The last element has a 1/ratio chance of being chosen, one before last is 1/(ratio^2), etc
// The logarithm is clipped up to 0, so the first two elements will have equal chance
export function expRandomElement<T>(array: T[], ratio: number): T {
    const r = Math.random();
    const logr = Math.log(r) / Math.log(ratio);
    const n = Math.floor(logr + array.length);
    const x = clipNumber(n, 0, array.length - 1);
    return array[x];
}

export const TypeColor = [
    '#A8A77A', // Normal
    '#EE8130', // Fire
    '#6390F0', // Water
    '#F7D02C', // Electric
    '#7AC74C', // Grass
    '#96D9D6', // Ice
    '#C22E28', // Fighting
    '#A33EA1', // Poison
    '#E2BF65', // Ground
    '#A98FF3', // Flying
    '#F95587', // Psychic
    '#A6B91A', // Bug
    '#B6A136', // Rock
    '#735797', // Ghost
    '#6F35FC', // Dragon
    '#705746', // Dark
    '#B7B7CE', // Steel
    '#D685AD', // Fairy
];

export const ROUTE_KILLS_NEEDED = 10;

// Achievements

export const ACHIEVEMENT_DEFEAT_ROUTE_VALUES = [
    100,
    1000,
    10000,
];
export const ACHIEVEMENT_DEFEAT_GYM_VALUES = [
    10,
    100,
    1000,
];
export const ACHIEVEMENT_DEFEAT_DUNGEON_VALUES = [
    10,
    100,
    250,
    500,
];

export type EnvironmentData = Partial<Record<Region, Set<string | number>>>;
export const Environments: Record<string, EnvironmentData> = {
    Water: {
        [Region.kanto]: new Set([12, 13, 19, 20, 21, 24, 26, 31, 32, 33, 34, 35, 36, 'Cerulean City']),
        [Region.johto]: new Set([40, 41, 'Slowpoke Well']),
        [Region.hoenn]: new Set([105, 106, 107, 108, 109, 118, 122, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134]),
        [Region.sinnoh]: new Set([218, 219, 220, 223, 230, 'Pastoria City', 'Lake Verity', 'Lake Valor', 'Sendoff Spring']),
        [Region.unova]: new Set([17, 18, 21, 24, 'Undella Town', 'Humilau City']),
        [Region.kalos]: new Set([8, 23, 'Coumarine City', 'Couriway Town', 'Sea Spirit\'s Den']),
        [Region.alola]: new Set([15, 19, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 'Hoppy Town', 'Friend League', 'Quick League', 'Heavy League', 'Great League', 'Fast League', 'Luxury League', 'Heal League', 'Ultra League', 'Elite Four League', 'Master League', 'Magikarp\'s Eye', 'Seafolk Village', 'Brooklet Hill', 'Mina\'s Houseboat', 'Lake of the Sunne and Moone']),
        [Region.galar]: new Set(['Hulbury', 'Roaring-Sea Caves', 5, 6, 8, 9, 16, 21, 27, 29, 36, 37, 41, 42, 43, 44, 51, 53]),
    },

    Ice: {
        [Region.kanto]: new Set(['Seafoam Islands', 'Icefall Cave']),
        [Region.johto]: new Set(['Mahogany Town', 'Ice Path']),
        [Region.hoenn]: new Set(['Sootopolis City', 'Shoal Cave']),
        [Region.sinnoh]: new Set([216, 217, 'Snowpoint City', 'Lake Acuity']),
        [Region.unova]: new Set(['Giant Chasm', 'Team Plasma Assault']),
        [Region.kalos]: new Set([17, 'Dendemille Town', 'Snowbelle City', 'Frost Cavern']),
        [Region.alola]: new Set(['Mount Lanakila']),
        [Region.galar]: new Set(['Circhester', 'Iceberg Ruins', 'Crown Shrine', 'Freezington', 26, 28, 31, 32, 46, 47, 54, 55]),
    },

    Fire: {
        [Region.kanto]: new Set(['Cinnabar Island', 'Mt. Ember', 'Mt. Ember Summit', 'Ruby Path']),
        [Region.johto]: new Set(),
        [Region.hoenn]: new Set(['Lavaridge Town', 'Fiery Path', 'Mt. Chimney', 'Mt. Chimney Crater', 'Magma Hideout']),
        [Region.sinnoh]: new Set(['Stark Mountain']),
        [Region.unova]: new Set(['Reversal Mountain']),
        [Region.kalos]: new Set(),
        [Region.alola]: new Set(['Wela Volcano Park']),
        [Region.galar]: new Set(['Motostoke']),
    },

    Forest: {
        [Region.kanto]: new Set([25, 30, 'Fuchsia City', 'Viridian Forest', 'Berry Forest', 'Pattern Bush', 'Valencia Island', 'Pinkan Forest']),
        [Region.johto]: new Set([36, 38, 43, 'Azalea Town', 'Ilex Forest']),
        [Region.hoenn]: new Set([119, 'Petalburg Woods']),
        [Region.sinnoh]: new Set([201, 204, 'Eterna City', 'Eterna Forest', 'Fullmoon Island', 'Newmoon Island']),
        [Region.unova]: new Set([6, 'Floccesy Town', 'Lostlorn Forest', 'Pinwheel Forest', 'Pledge Grove']),
        [Region.kalos]: new Set([1, 14, 20, 'Laverre City', 'Santalune Forest', 'Pokémon Village']),
        [Region.alola]: new Set([27, 'Melemele Woods', 'Lush Jungle', 'Malie Garden', 'Ula\'ula Meadow', 'Poni Meadow']),
        [Region.galar]: new Set(['Slumbering Weald', 'Slumbering Weald Shrine', 'Glimwood Tangle', 'Ballonlea', 'Dyna Tree Hill', 2, 12, 13, 35]),
    },

    Cave: {
        [Region.kanto]: new Set([37, 39, 'Pewter City', 'Diglett\'s Cave', 'Mt. Moon', 'Rock Tunnel', 'Victory Road', 'Lost Cave', 'Altering Cave', 'Tanoby Ruins']),
        [Region.johto]: new Set(['Cianwood City', 'Ruins of Alph', 'Union Cave', 'Mt. Mortar', 'Dark Cave', 'Tohjo Falls', 'Victory Road Johto']),
        [Region.hoenn]: new Set(['Rustboro City', 'Dewford Town', 'Rusturf Tunnel', 'Granite Cave', 'Meteor Falls', 'Jagged Pass', 'Seafloor Cavern', 'Victory Road Hoenn']),
        [Region.sinnoh]: new Set(['Oreburgh City', 'Oreburgh Gate', 'Wayward Cave', 'Mt. Coronet', 'Mt. Coronet South', 'Iron Island', 'Mt. Coronet North', 'Victory Road Sinnoh']),
        [Region.unova]: new Set(['Relic Castle', 'Relic Passage', 'Seaside Cave', 'Victory Road Unova', 'Twist Mountain']),
        [Region.kalos]: new Set([9, 13, 'Connecting Cave', 'Kiloude City', 'Terminus Cave', 'Victory Road Kalos']),
        [Region.alola]: new Set([12, 22, 29, 'Verdant Cavern', 'Seaward Cave', 'Ten Carat Hill', 'Diglett\'s Tunnel', 'Vast Poni Canyon']),
        [Region.galar]: new Set(['Warm-Up Tunnel', 'Courageous Cavern', 'Brawlers\' Cave', 'Rock Peak Ruins', 'Split-Decision Ruins', 'Lakeside Cave', 'Tunnel to the Top', 18]),
    },

    GemCave: {
        [Region.kanto]: new Set(['Viridian City', 'Cerulean Cave', 'Sunburst Island']),
        [Region.johto]: new Set(['Blackthorn City', 'Mt. Silver', 'Whirl Islands']),
        [Region.hoenn]: new Set(['Cave of Origin', 'Sky Pillar', 'Sealed Chamber']),
        [Region.sinnoh]: new Set(['Spear Pillar', 'Hall of Origin']),
        [Region.unova]: new Set(['Chargestone Cave', 'Mistralton Cave', 'Cave of Being']),
        [Region.kalos]: new Set(['Glittering Cave', 'Reflection Cave']),
        [Region.alola]: new Set(['Altar of the Sunne and Moone', 'Resolution Cave']),
        [Region.galar]: new Set(['Galar Mine', 'Galar Mine No. 2', 'Iron Ruins']),
    },

    PowerPlant: {
        [Region.kanto]: new Set(['Vermilion City', 'Rocket Game Corner', 'Power Plant']),
        [Region.johto]: new Set(['Tin Tower', 'Team Rocket\'s Hideout', 'Radio Tower']),
        [Region.hoenn]: new Set(['Mauville City', 'New Mauville', 'Weather Institute', 'Aqua Hideout', 'Near Space']),
        [Region.sinnoh]: new Set(['Sunyshore City', 'Valley Windworks', 'Team Galactic Eterna Building', 'Team Galactic HQ']),
        [Region.unova]: new Set(['Castelia Sewers', 'Virbank City', 'Nimbasa City', 'A Totally Unsuspicious Frigate', 'Plasma Frigate']),
        [Region.kalos]: new Set(['Lumiose City', 'Kalos Power Plant', 'Poké Ball Factory', 'Team Flare Secret HQ']),
        [Region.alola]: new Set(['Aether Paradise', 'Hokulani Observatory', 'Aether Foundation']),
        [Region.galar]: new Set(['Spikemuth', 'Energy Plant', 'Armor Station', 'Crown Tundra Station']),
    },

    Mansion: {
        [Region.kanto]: new Set(['Silph Co.', 'Pokémon Mansion']),
        [Region.johto]: new Set(['Olivine City', 'Sprout Tower', 'Burned Tower']),
        [Region.hoenn]: new Set(['Petalburg City', 'Pyrite Bldg']),
        [Region.sinnoh]: new Set(['Veilstone City', 'Canalave City', 'Snowpoint Temple']),
        [Region.unova]: new Set(['Castelia City', 'Mistralton City', 'Opelucid City', 'Liberty Garden', 'Dragonspiral Tower', 'Dreamyard']),
        [Region.kalos]: new Set(['Parfum Palace', 'Lost Hotel']),
        [Region.alola]: new Set(['Trainers\' School', 'Thrifty Megamart', 'Po Town', 'Ruins of Conflict', 'Ruins of Life', 'Ruins of Abundance', 'Ruins of Hope']),
        [Region.galar]: new Set(['Rose Tower', 'Hammerlocke', 'Stow-on-Side', 'Tower of Darkness', 'Tower of Waters', 'Professor Magnolia\'s House', 'Wyndon', 'Wyndon Stadium', 'Master Dojo', 11]),
    },

    Graveyard: {
        [Region.kanto]: new Set(['Saffron City', 'Pokémon Tower']),
        [Region.johto]: new Set(['Ecruteak City']),
        [Region.hoenn]: new Set(['Mossdeep City', 'Mt. Pyre']),
        [Region.sinnoh]: new Set(['Hearthome City', 'Old Chateau', 'Solaceon Ruins', 'Distortion World']),
        [Region.unova]: new Set(['Celestial Tower']),
        [Region.kalos]: new Set(),
        [Region.alola]: new Set(['Hau\'oli Cemetery', 'Memorial Hill']),
        [Region.galar]: new Set(['Dusty Bowl', 49]),
    },
};

export type Environment = keyof typeof Environments;

export const EnvironmentCssClass: Record<Environment, string> = {
    Water: 'water',
    Ice: 'ice',
    Fire: 'fire',
    Forest: 'forest',
    Cave: 'cave',
    GemCave: 'cave-gem',
    PowerPlant: 'power-plant',
    Mansion: 'mansion',
    Graveyard: 'graveyard',
};

// Starter Pokémon

export enum Starter {
    None = -1,
    Grass = 0,
    Fire = 1,
    Water = 2,
    Special = 3,
}

export const RegionalStarters = [
    [1, 4, 7, 25], // Kanto
    [152, 155, 158], // Johto
    [252, 255, 258], // Hoenn
    [387, 390, 393], // Sinnoh
    [495, 498, 501], // Unova
    [650, 653, 656], // Kalos
    [722, 725, 728], // Alola
    [810, 813, 816], // Galar
];

export enum StoneType {
    'None' = -1,
    'Leaf_stone',
    'Fire_stone',
    'Water_stone',
    'Thunder_stone',
    'Moon_stone',
    'Linking_cord',
    'Sun_stone',
    'Soothe_bell',
    'Metal_coat',
    'Kings_rock',
    'Upgrade',
    'Dragon_scale',
    'Prism_scale',
    'Deepsea_tooth',
    'Deepsea_scale',
    'Shiny_stone',
    'Dusk_stone',
    'Dawn_stone',
    'Razor_claw',
    'Razor_fang',
    'Electirizer',
    'Magmarizer',
    'Protector',
    'Dubious_disc',
    'Reaper_cloth',
    'Black_DNA',
    'White_DNA',
    'Sachet',
    'Whipped_dream',
    'Key_stone',
    'Ice_stone',
    'Solar_light',
    'Lunar_light',
    'Pure_light',
    'Sweet_apple',
    'Tart_apple',
    'Cracked_pot',
    'Galarica_cuff',
    'Galarica_wreath',
    'Black_mane_hair',
    'White_mane_hair',
}

export enum FossilPieceType {
    'None' = -1,
    'Fossilized Bird',
    'Fossilized Fish',
    'Fossilized Drake',
    'Fossilized Dino',
}

export enum BattleItemType {
    'xAttack' = 'xAttack',
    'xClick' = 'xClick',
    'Lucky_egg' = 'Lucky_egg',
    'Token_collector' = 'Token_collector',
    'Dowsing_machine' = 'Dowsing_machine',
    'Lucky_incense' = 'Lucky_incense',
}

export enum FluteItemType {
    'Yellow_Flute' = 'Yellow_Flute',
    'Time_Flute' = 'Time_Flute',
    'Black_Flute' = 'Black_Flute',
    'Red_Flute' = 'Red_Flute',
    'White_Flute' = 'White_Flute',
    'Blue_Flute' = 'Blue_Flute',
    // 'Poke_Flute' = 'Poke_Flute',
    // 'Azure_Flute' = 'Azure_Flute',
    // 'Eon_Flute' = 'Eon_Flute',
    // 'Sun_Flute' = 'Sun_Flute',
    // 'Moon_Flute' = 'Moon_Flute',
    // 'Grass_Flute' = 'Grass_Flute',
}

export enum PokemonItemType {
    'Pinkan Arbok',
    'Pinkan Oddish',
    'Pinkan Poliwhirl',
    'Pinkan Geodude',
    'Pinkan Dodrio',
    'Lickitung',
    'Pinkan Weezing',
    'Mr. Mime',
    'Pinkan Scyther',
    'Jynx',
    'Pinkan Electabuzz',
    'Magikarp',
    'Eevee',
    'Porygon',
    'Togepi',
    'Beldum',
    'Skorupi',
    'Combee',
    'Burmy (Plant)',
    'Spiritomb',
    'Cherubi',
    'Zorua',
    'Meloetta (Pirouette)',
    'Type: Null',
    'Poipole',
    'Dracozolt',
    'Arctozolt',
    'Dracovish',
    'Arctovish',
    'Zarude (Dada)',
}

export enum UltraBeastType {
    'Nihilego',
    'Buzzwole',
    'Pheromosa',
    'Xurkitree',
    'Kartana',
    'Celesteela',
    'Blacephalon',
    'Stakataka',
    'Guzzlord',
    'Poipole',
    'Naganadel',
}

export enum PokeBlockColor {
    Black,
    Red,
    Blue,
    Pink,
    Green,
    Yellow,
    Gold,
    Purple,
    Indigo,
    Brown,
    LiteBlue,
    Olive,
    Flaxen,
    Gray,
    White,
}

export enum VitaminType {
    Protein,
    Calcium,
    Carbos,
}

export enum EggItemType {
    'Fire_egg',
    'Water_egg',
    'Grass_egg',
    'Fighting_egg',
    'Electric_egg',
    'Dragon_egg',
    'Pokemon_egg',
    'Mystery_egg',
}

export enum BulletinBoards {
    None = -2,
    All = -1,
    Kanto,
    Johto,
    Hoenn,
    Sevii4567,
    Sinnoh,
    Kalos,
    Alola,
    Hoppy,
    Galar,
    Armor,
    Crown,
}

// Underground

export enum EnergyRestoreSize {
    SmallRestore,
    MediumRestore,
    LargeRestore,
}

export const EnergyRestoreEffect = {
    SmallRestore: 0.1,
    MediumRestore: 0.2,
    LargeRestore: 0.5,
};

export const FossilToPokemon = {
    'Helix Fossil': 'Omanyte',
    'Dome Fossil': 'Kabuto',
    'Old Amber': 'Aerodactyl',
    'Root Fossil': 'Lileep',
    'Claw Fossil': 'Anorith',
    'Armor Fossil': 'Shieldon',
    'Skull Fossil': 'Cranidos',
    'Cover Fossil': 'Tirtouga',
    'Plume Fossil': 'Archen',
    'Jaw Fossil': 'Tyrunt',
    'Sail Fossil': 'Amaura',
};

// Used for image name
export const PokemonToFossil = {
    Omanyte: 'Helix Fossil',
    Kabuto: 'Dome Fossil',
    Aerodactyl: 'Old Amber',
    Lileep: 'Root Fossil',
    Anorith: 'Claw Fossil',
    Shieldon: 'Armor Fossil',
    Cranidos: 'Skull Fossil',
    Tirtouga: 'Cover Fossil',
    Archen: 'Plume Fossil',
    Tyrunt: 'Jaw Fossil',
    Amaura: 'Sail Fossil',
};

// For random quest, name matches entry in gymList (created in Gym.ts)
export const KantoGyms = [
    'Pewter City',
    'Cerulean City',
    'Vermilion City',
    'Celadon City',
    'Saffron City',
    'Fuchsia City',
    'Cinnabar Island',
    'Viridian City',
    'Elite Lorelei',
    'Elite Bruno',
    'Elite Agatha',
    'Elite Lance',
    'Champion Blue',
];

export const JohtoGyms = [
    'Violet City',
    'Azalea Town',
    'Goldenrod City',
    'Ecruteak City',
    'Cianwood City',
    'Olivine City',
    'Mahogany Town',
    'Blackthorn City',
    'Elite Will',
    'Elite Koga',
    'Elite Bruno2',
    'Elite Karen',
    'Champion Lance',
];

export const HoennGyms = [
    'Rustboro City',
    'Dewford Town',
    'Mauville City',
    'Lavaridge Town',
    'Petalburg City',
    'Fortree City',
    'Mossdeep City',
    'Sootopolis City',
    'Elite Sidney',
    'Elite Phoebe',
    'Elite Glacia',
    'Elite Drake',
    'Champion Wallace',
];

export const SinnohGyms = [
    'Oreburgh City',
    'Eterna City',
    'Hearthome City',
    'Veilstone City',
    'Pastoria City',
    'Canalave City',
    'Snowpoint City',
    'Sunyshore City',
    'Elite Aaron',
    'Elite Bertha',
    'Elite Flint',
    'Elite Lucian',
    'Champion Cynthia',
];

export const UnovaGyms = [
    'Aspertia City',
    'Virbank City',
    'Castelia City',
    'Nimbasa City',
    'Driftveil City',
    'Mistralton City',
    'Opelucid City',
    'Humilau City',
    'Elite Shauntal',
    'Elite Marshal',
    'Elite Grimsley',
    'Elite Caitlin',
    'Champion Iris',
];

export const KalosGyms = [
    'Santalune City',
    'Cyllage City',
    'Shalour City',
    'Coumarine City',
    'Lumiose City',
    'Laverre City',
    'Anistar City',
    'Snowbelle City',
    'Elite Malva',
    'Elite Siebold',
    'Elite Wikstrom',
    'Elite Drasna',
    'Champion Diantha',
];

export const AlolaGyms = [
    'Ilima\'s Trial',
    'Iki Town',
    'Lana\'s Trial',
    'Kiawe\'s Trial',
    'Mallow\'s Trial',
    'Konikoni City',
    'Sophocles\' Trial',
    'Acerola\'s Trial',
    'Malie City',
    'Vast Poni Canyon Trial',
    'Mina\'s Trial',
    'Exeggutor Island',
    'Elite Molayne',
    'Elite Olivia',
    'Elite Acerola',
    'Elite Kahili',
    'Champion Hau',
];

export const GalarGyms = [
    'Turffield',
    'Hulbury',
    'Motostoke',
    'Stow-on-Side1',
    'Stow-on-Side2',
    'Ballonlea',
    'Circhester1',
    'Circhester2',
    'Spikemuth',
    'Hammerlocke',
    'Elite Trainer Marnie',
    'Elite Gym Leader Bede',
    'Elite Trainer Hop',
    'Champion Leon',
    'Elite Gym Leader Klara',
    'Elite Gym Leader Avery',
    'Elite Dojo Matron Honey',
    'Elite Dojo Master Mustard',
    'Elite Trainer Peony',
];

export const OrangeGyms = [
    'Mikan Island',
    'Navel Island',
    'Trovita Island',
    'Kumquat Island',
    'Supreme Gym Leader Drake',
];
export const MagikarpJumpGyms = [
    'Friend League',
    'Quick League',
    'Heavy League',
    'Great League',
    'Fast League',
    'Luxury League',
    'Heal League',
    'Ultra League',
    'E4 League',
    'Master League',
];

export const RegionGyms = [
    KantoGyms,
    JohtoGyms,
    HoennGyms,
    SinnohGyms,
    UnovaGyms,
    KalosGyms,
    AlolaGyms,
    GalarGyms,
    // Keep it at the bottom, as we want optional badges at the bottom
    OrangeGyms,
    MagikarpJumpGyms,
];

export function getGymIndex(gym: string): number {
    return RegionGyms.flat().findIndex((g) => g === gym);
}

export function getGymRegion(gym: string): Region {
    return RegionGyms.findIndex((gyms) => gyms.find((g) => g === gym));
}

export const KantoDungeons = [
    'Viridian Forest', // 0
    'Mt. Moon',
    'Diglett\'s Cave',
    'Rock Tunnel',
    'Rocket Game Corner',
    'Pokémon Tower',
    'Silph Co.',
    'Power Plant',
    'Seafoam Islands',
    'Pokémon Mansion',
    'Mt. Ember Summit',
    'Berry Forest',
    'Victory Road',
    'Cerulean Cave',
    'Ruby Path',
    'Icefall Cave',
    'Sunburst Island',
    'Lost Cave',
    'Pattern Bush',
    'Altering Cave',
    'Tanoby Ruins',
    'Pinkan Mountain', // 21
];

export const JohtoDungeons = [
    'Sprout Tower', // 22
    'Ruins of Alph',
    'Union Cave',
    'Slowpoke Well',
    'Ilex Forest',
    'Burned Tower',
    'Tin Tower',
    'Whirl Islands',
    'Mt. Mortar',
    'Team Rocket\'s Hideout',
    'Radio Tower',
    'Ice Path',
    'Dark Cave',
    'Tohjo Falls',
    'Victory Road Johto',
    'Mt. Silver', // 37
];

export const HoennDungeons = [
    'Petalburg Woods', // 38
    'Rusturf Tunnel',
    'Granite Cave',
    'Fiery Path',
    'Meteor Falls',
    'Mt. Chimney Crater',
    'Jagged Pass',
    'New Mauville',
    'Weather Institute',
    'Mt. Pyre',
    'Magma Hideout',
    'Aqua Hideout',
    'Shoal Cave',
    'Seafloor Cavern',
    'Sealed Chamber',
    'Cave of Origin',
    'Sky Pillar',
    'Victory Road Hoenn',
    'Near Space',
    'Pyrite Bldg', // 57
    // These aren't implemented anywhere yet
    /*
    "Island Cave",
    "Desert Ruins",
    "Scorched Slab",
    "Ancient Tomb",
    "Artisan Cave",
    "Desert Underpass",
    "Marine Cave",
    "Terra Cave",
    "Southern Island",
    "Faraway Island",
    "Birth Island",
    "Devon Corporation",
    "Oceanic Museum",
    "Mirage Tower",
    "Safari Zone",
    "Mirage Island",
    "Battle Tower",
    "Trainer Hill",
    "Abandoned Ship",
    "Battle Maison",
    "Battle Resort",
    "Mirage Spots",
    */
];

export const SinnohDungeons = [
    'Oreburgh Gate', // 58
    'Valley Windworks',
    'Eterna Forest',
    'Old Chateau',
    'Team Galactic Eterna Building',
    'Wayward Cave',
    'Mt. Coronet South',
    'Solaceon Ruins',
    'Iron Island',
    'Lake Valor',
    'Lake Verity',
    'Mt. Coronet North',
    'Lake Acuity',
    'Team Galactic HQ',
    'Spear Pillar',
    'Distortion World',
    'Victory Road Sinnoh',
    'Sendoff Spring',
    'Fullmoon Island',
    'Newmoon Island',
    'Flower Paradise',
    'Snowpoint Temple',
    'Stark Mountain',
    'Hall of Origin', // 81
];

export const UnovaDungeons = [
    'Floccesy Ranch', // 82
    'Liberty Garden',
    'Castelia Sewers',
    'Relic Passage',
    'Relic Castle',
    'Lostlorn Forest',
    'Chargestone Cave',
    'Mistralton Cave',
    'Celestial Tower',
    'Reversal Mountain',
    'Seaside Cave',
    'Plasma Frigate',
    'Giant Chasm',
    'Cave of Being', // Contains gen 4 trio only
    'Abundant Shrine',
    'Victory Road Unova',
    'Twist Mountain',
    'Dragonspiral Tower',
    'Moor of Icirrus',
    'Pledge Grove',
    'Pinwheel Forest',
    'Dreamyard',
    'P2 Laboratory', // 104
];

export const KalosDungeons = [
    'Santalune Forest', // 105
    'Connecting Cave',
    'Glittering Cave',
    'Reflection Cave',
    // 'Tower of Mastery',
    'Sea Spirit\'s Den',
    'Kalos Power Plant',
    'Poké Ball Factory',
    'Lost Hotel',
    'Frost Cavern',
    'Team Flare Secret HQ',
    'Terminus Cave',
    'Pokémon Village',
    'Victory Road Kalos', // 117
    // 'Unknown Dungeon',
];

export const AlolaDungeons = [
    'Trainers\' School', // 118
    'Hau\'oli Cemetery',
    'Verdant Cavern',
    'Melemele Meadow',
    'Seaward Cave',
    'Ten Carat Hill',
    'Pikachu Valley',
    'Paniola Ranch',
    'Brooklet Hill',
    'Wela Volcano Park',
    'Lush Jungle',
    'Diglett\'s Tunnel',
    'Memorial Hill',
    'Malie Garden',
    'Hokulani Observatory',
    'Thrifty Megamart',
    'Ula\'ula Meadow',
    'Po Town',
    'Aether Foundation',
    'Exeggutor Island Hill',
    'Vast Poni Canyon',
    'Mina\'s Houseboat',
    'Mount Lanakila',
    'Lake of the Sunne and Moone',
    'Ruins of Conflict',
    'Ruins of Life',
    'Ruins of Abundance',
    'Ruins of Hope',
    'Poni Meadow',
    'Resolution Cave', // 147
];

export const GalarDungeons = [
    'Slumbering Weald Shrine', // 148
    'Galar Mine',
    'Galar Mine No. 2',
    'Glimwood Tangle',
    'Rose Tower',
    'Energy Plant',
    'Dusty Bowl',
    'Courageous Cavern',
    'Brawlers\' Cave',
    'Warm-Up Tunnel',
    'Tower of Darkness',
    'Tower of Waters',
    'Roaring-Sea Caves',
    'Rock Peak Ruins',
    'Iron Ruins',
    'Iceberg Ruins',
    'Split-Decision Ruins',
    'Lakeside Cave',
    'Dyna Tree Hill',
    'Tunnel to the Top',
    'Crown Shrine', // 168
];

export const RegionDungeons = [
    KantoDungeons,
    JohtoDungeons,
    HoennDungeons,
    SinnohDungeons,
    UnovaDungeons,
    KalosDungeons,
    AlolaDungeons,
    GalarDungeons,
];

export function getDungeonIndex(dungeon: string): number {
    return RegionDungeons.flat().findIndex((d) => d === dungeon);
}

export function getDungeonRegion(dungeon: string): Region {
    return RegionDungeons.findIndex((dungeons) => dungeons.find((d) => d === dungeon));
}

export const StartingTowns = [
    'Pallet Town', // Kanto
    'New Bark Town', // Johto
    'Littleroot Town', // Hoenn
    'Twinleaf Town', // Sinnoh
    'Aspertia City', // Unova
    'Vaniville Town', // Kalos
    'Iki Town Outskirts', // Alola
    'Postwick', // Galar
    'Final Region Town', // Final
];

export const StartingRoutes = [
    1, // Kanto
    29, // Johto
    101, // Hoenn
    201, // Sinnoh
    19, // Unova
    1, // Kalos
    1, // Alola
    1, // Galar
];

export const DockTowns = [
    'Vermilion City', // Kanto
    'Olivine City', // Johto
    'Slateport City', // Hoenn
    'Canalave City', // Sinnoh
    'Castelia City', // Unova
    'Coumarine City', // Kalos
    'Hau\'oli City', // Alola
    'Hulbury', // Galar
];

export const TemporaryBattles = [
    'Blue 1',
    'Blue 2',
    'Blue 3',
    'Blue 4',
    'Fighting Dojo',
    'Snorlax route 12',
    'Snorlax route 16',
    'Blue 5',
    'Biker Goon 1',
    'Biker Goon 2',
    'Biker Goon 3',
    'Cue Ball Paxton',
    'Bill\'s Grandpa',
    'Blue 6',
    'Silver 1',
    'Silver 2',
    'Sudowoodo',
    'Silver 3',
    'Silver 4',
    'Silver 5',
    'Suicune 1',
    'Eusine',
    'Suicune 2',
    'Red Gyarados',
    'Suicune 3',
    'Suicune 4',
    'Suicune 5',
    'Suicune 6',
    'Silver 6',
    'Silver 7',
    'Red',
    'Youngster Joey',
    'May 1',
    'May 2',
    'May 3',
    'Wally 1',
    'May 4',
    'Kecleon 1',
    'Kecleon 2',
    'Kecleon 3',
    'May 5',
    'Wally 2',
    'Clown Jessie & James',
    'Butler 1',
    'Butler 2',
    'Meta Groudon',
    'Latios',
    'Latias',
    'Sevii Rocket Grunt 1',
    'Sevii Rocket Grunt 2',
    'Sevii Rocket Grunt 3',
    'Sevii Rocket Grunt 4',
    'Sevii Rocket Grunt 5',
    'Sevii Rocket Ariana',
    'Sevii Rocket Archer',
    'Scientist Gideon',
    'Pinkan Jessie & James',
    'Pinkan Officer Jenny',
    'Kimono Girls',
    'Spiky-eared Pichu',
    'Rocket Boss Giovanni',
    'Barry 1',
    'Barry 2',
    'Barry 3',
    'Barry 4',
    'Galactic Boss Cyrus',
    'Barry 5',
    'Barry 6',
    'Barry 7',
    'Manaphy Go-Rock MGrunt 1',
    'Manaphy Go-Rock MGrunt 2',
    'Manaphy Go-Rock MGrunt 3',
    'Manaphy Go-Rock MGrunt 4',
    'Manaphy Go-Rock FGrunt 1',
    'Manaphy Go-Rock FGrunt 2',
    'Manaphy Go-Rock Commander',
    'Manaphy Go-Rock Pincher',
    'Manaphy Egg Protectors',
    'Zero',
    'Hugh 1',
    'Hugh 2',
    'Team Plasma Grunt 1',
    'Colress 1',
    'Team Plasma Grunt 2',
    'Team Plasma Grunt 3',
    'Hugh 3',
    'Cheren',
    'Colress 2',
    'Team Plasma Grunt 4',
    'Team Plasma Grunt 5',
    'Team Plasma Grunts 1',
    'Team Plasma Grunts 2',
    'Hugh 4',
    'Team Plasma Grunt 6',
    'Zinzolin 1',
    'Team Plasma Grunt 7',
    'Team Plasma Grunt 8',
    'Team Plasma Grunt 9',
    'Zinzolin 2',
    'Plasma Shadow 1',
    'Colress 3',
    'Plasma Shadow 2',
    'Plasma Shadow 3',
    'Plasma Shadow 4',
    'Ghetsis 1',
    'Ghetsis 2',
    'Hugh 5',
    'Hugh 6',
    'Hugh 7',
    'Dream Researcher',
    'Shauna 1',
    'Sycamore 1',
    'Tierno 1',
    'Trevor & Tierno',
    'Team Flare Grunt 1',
    'Team Flare Grunt 2',
    'Calem 1',
    'Korrina',
    'Courtney 1',
    'Matt 1',
    'Zinnia 1',
    'Draconid Elder',
    'Aqua Grunt',
    'Magma Grunt',
    'Courtney 2',
    'Matt 2',
    'Delta Wallace',
    'Zinnia 2',
    'Deoxys',
    'Delta Giovanni',
    'Mr. Stone',
    'Shoal Fisherman',
    'Delta Brock',
    'Delta Tabitha',
    'Delta Shelly',
    'Icy Boulder',
    'Mega Draconid Elder',
    'Delta Steven',
    'Dr Cozmo',
    'Matt 3',
    'Courtney 3',
    'Hoenn Stone Salesman',
    'Aipom Alley',
    'Mime Interview',
    'Underground Fighting Ring',
    'Lab Ambush',
    'Imposter',
    'Possessed Mewtwo',
    'Calem 2',
    'Calem 3',
    'Calem 4',
    'Hex Maniac Aster',
    'Team Flare Lysandre 1',
    'Team Flare Xerosic',
    'Xerneas',
    'Yveltal',
    'Team Flare Boss Lysandre 1',
    'Sycamore 2',
    'Shauna 2',
    'Tierno 2',
    'Trevor',
    'Calem 5',
    'Riot',
    'Merilyn',
    'Millis and Argus Steel',
    'Rampaging Yveltal',
    'Storyline AZ',
    'AZ',
    'Ash Ketchum Kanto',
    'Ash Ketchum Johto',
    'Ash Ketchum Hoenn',
    'Ash Ketchum Sinnoh',
    'Ash Ketchum Unova',
    'Ash Ketchum Kalos',
    'Ash Ketchum Pinkan',
    'Calem 6',
    'Marquis Grant',
    'Grand Duchess Diantha',
    'Team Flare Boss Lysandre 2',
    'Wild Houndour Horde',
    'Wild Electrike Horde',
    'Hau 1',
    'Hau 2',
    'Hau 3',
    'Dexio',
    'Sina',
    'Hau 4',
    'Gladion 1',
    'Battle Royal',
    'Plumeria 1',
    'Ultra Wormhole',
    'Hau 5',
    'Plumeria 2',
    'Gladion 2',
    'Necrozma',
    'Ultra Megalopolis',
    'Captain Mina',
    'Captain Ilima',
    'Captain Mallow',
    'Captain Lana',
    'Captain Kiawe',
    'Captain Sophocles',
    'Kahuna Nanu',
    'Gladion 3',
    'Anabel',
    'Captain Mina UB',
    'Kahuna Nanu UB',
    'Ash Ketchum Alola',
    'Rainbow Rocket Grunt 1',
    'Rainbow Rocket Grunt 2',
    'Aether Branch Chief Faba',
    'Team Aqua Leader Archie',
    'Team Magma Leader Maxie',
    'Team Galactic Leader Cyrus',
    'Team Flare Leader Lysandre',
    'Team Plasma Leader Ghetsis',
    'Team Rainbow Leader Giovanni',
    'Magikarp Jump Koylee',
    'Magikarp Jump Karpella',
    'Magikarp Jump Karpen',
    'Magikarp Jump Tykarp',
    'Magikarp Jump Karpress',
    'Magikarp Jump Karami',
    'Magikarp Jump Karson',
    'Magikarp Jump Karpress 2',
    'Magikarp Jump Karpen 2',
    'Magikarp Jump Karbuck',
    'Magikarp Jump Skyhopper',
    'Magikarp Jump Karpen 3',
    'Magikarp Jump Karpella 2',
    'Magikarp Jump Karbuck 2',
    'Magikarp Jump Kareign',
    'Magikarp Jump Koylee 2',
    'Magikarp Jump Karpress 3',
    'Magikarp Jump Karpen 4',
    'Magikarp Jump Karpella 3',
    'Magikarp Jump Skyhopper 2',
    'Magikarp Jump Tykarp 2',
    'Hop 1',
    'Mirages',
    'Hop 2',
    'Hop 3',
    'Bede 1',
    'Hop 4',
    'Bede 2',
    'Marnie 1',
    'Hop 5',
    'Bede 3',
    'Hop 6',
    'Hop 7',
    'Marnie 2',
    'Eternatus',
    'The Darkest Day',
    'Hop 8',
    'Sordward 1',
    'Shielbert 1',
    'Rampaging Tsareena',
    'Rampaging Gyarados',
    'Rampaging Torkoal',
    'Sordward & Shielbert',
    'Rampaging Conkeldurr',
    'Rampaging Dusknoir',
    'Gym Leader Bede',
    'Rampaging Gigalith',
    'Rampaging Froslass',
    'Gym Leader Marnie',
    'Rampaging Haxorus',
    'Sordward 2',
    'Shielbert 2',
    'Rampaging Zacian',
    'Rampaging Zamazenta',
    'Klara 1',
    'Avery 1',
    'Mustard',
    'Klara 2',
    'Avery 2',
    'Klara 3',
    'Avery 3',
    'Kubfu',
    'Zarude Tribe 1',
    'Zarude Tribe 2',
    'Zarude Tribe 3',
    'Ash Ketchum Galar',
    'Zarude (Dada)',
    'Flowering Celebi',
    'Peony',
    'Calyrex',
    'Glastrier',
    'Spectrier',
    'Dyna Tree Birds',
    'Galarian Articuno 1',
    'Galarian Articuno 2',
    'Galarian Articuno 3',
    'Galarian Zapdos 1',
    'Galarian Zapdos 2',
    'Galarian Zapdos 3',
    'Galarian Moltres 1',
    'Galarian Moltres 2',
    'Galarian Moltres 3',
    'Regigigas',
];

export enum ShardTraderLocations {
    'None' = -1,
    'Cerulean City' = 0,
    'Vermilion City',
    'Lavender Town',
    'Saffron City',
    'Fuchsia City',
    'Cinnabar Island',
    'Azalea Town',
    'Ecruteak City',
    'Olivine City',
    'Cianwood City',
    'Mahogany Town',
    'Blackthorn City',
    'Petalburg City',
    'Dewford Town',
    'Slateport City',
    'Mauville City',
    'Verdanturf Town',
    'Lavaridge Town',
    'Fallarbor Town',
    'Fortree City',
    'Mossdeep City',
    'Pacifidlog Town',
    'Sootopolis City',
    'Ever Grande City',
    'Oreburgh City',
    'Floaroma Town',
    'Eterna City',
    'Hearthome City',
    'Solaceon Town',
    'Pastoria City',
    'Celestic Town',
    'Pal Park',
    'Canalave City',
    'Snowpoint City',
    'Sunyshore City',
    'Survival Area',
    'Resort Area',
    'Castelia City',
    'Nimbasa City',
    'Driftveil City',
    'Mistralton City',
    'Lentimas Town',
    'Undella Town',
    'Lacunosa Town',
    'Opelucid City',
    'Humilau City',
    'Icirrus City',
    'Black and White Park',
    'Nacrene City',
    'Striaton City',
    'Accumula Town',
    'Nuvema Town',
    'Camphrier Town',
    'Parfum Palace',
    'Ambrette Town',
    'Cyllage City',
    'Geosenge Town',
    'Shalour City',
    'Coumarine City',
    'Laverre City',
    'Dendemille Town',
    'Anistar City',
    'Couriway Town',
    'Snowbelle City',
    'Hau\'oli City',
    'Heahea City',
    'Paniola Town',
    'Konikoni City',
    'Aether Paradise',
    'Malie City',
    'Tapu Village',
    'Seafolk Village',
    'Exeggutor Island',
    'Altar of the Sunne and Moone',
    'Turffield',
    'Hulbury',
    'Motostoke',
    'Hammerlocke',
    'Route 6',
    'Stow-on-Side',
    'Ballonlea',
    'Circhester',
    'Spikemuth',
    'Master Dojo',
}

export enum BerryTraderLocations {
    'None' = -1,
    'Goldenrod City' = 0,
    'Mauville City',
    'Pinkan Pokémon Reserve',
    'Hearthome City',
}

export function getTemporaryBattlesIndex(temporaryBattle: string): number {
    return TemporaryBattles.findIndex((t) => t === temporaryBattle);
}

export enum DayOfWeek {
    'Sunday' = 0,
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
}

export enum Pokerus {
    'Uninfected' = 0,
    'Infected',
    'Contagious',
    'Resistant',
}

// Gender Types
export enum Genders {
    Genderless = 0,
    MaleFemale, // Default
}

// Wild/Trainer/BF Pokémon Gender
export enum BattlePokemonGender {
    NoGender = 0,
    Male,
    Female,
}

// Pokemon Statistics
export enum PokemonStatisticsType {
    Captured = 'Captured',
    Defeated = 'Defeated',
    Encountered = 'Encountered',
    Hatched = 'Hatched',
    Seen = 'Seen',
}

// Alcremie

export enum AlcremieSweet {
    'Strawberry Sweet',
    'Love Sweet',
    'Berry Sweet',
    'Clover Sweet',
    'Flower Sweet',
    'Star Sweet',
    'Ribbon Sweet',
}
export enum AlcremieSpins {
    dayClockwiseBelow5,
    dayCounterclockwiseBelow5,
    nightClockwiseBelow5,
    nightCounterclockwiseAbove5,
    nightClockwiseAbove5,
    nightCounterclockwiseBelow5,
    dayClockwiseAbove5,
    dayCounterclockwiseAbove5,
    at5Above10,
}

export enum ExtraAchievementCategories {
    global = Region.final,
    sevii,
    magikarpJump,
}

export const DayCycleStartHours: Record<DayCyclePart, number> = {
    [DayCyclePart.Dawn]: 5,
    [DayCyclePart.Day]: 6,
    [DayCyclePart.Dusk]: 17,
    [DayCyclePart.Night]: 18,
};

export enum ShadowStatus {
    None,
    Shadow,
    Purified,
}

/* Crobat Fork */
// Sort Icons
export const ICON_SORT_UP = '<i class=\'bi bi-sort-up\'>';
export const ICON_SORT_DOWN = '<i class=\'bi bi-sort-down\'>';

// Poké Ball Selectors
export enum PokeballSelector {
    alreadyCaught = 0,
    alreadyCaughtShiny,
    notCaught,
    notCaughtShiny,
    type,
    contagious,
    roaming,
    dungeonBoss,
    legendaryMythical,
}

// Legendary and Mythical Pokémon
export const LegendaryType = [
    144, // Articuno
    145, // Zapdos
    146, // Moltres
    150, // Mewtwo
    243, // Raikou
    244, // Entei
    245, // Suicune
    249, // Lugia
    250, // Ho-Oh
    377, // Regirock
    378, // Regice
    379, // Registeel
    380, // Latias
    381, // Latios
    382, // Kyogre
    383, // Groudon
    384, // Rayquaza
    480, // Uxie
    481, // Mesprit
    482, // Azelf
    483, // Dialga
    484, // Palkia
    485, // Heatran
    486, // Regigigas
    487, // Giratina
    488, // Cresselia
    638, // Cobalion
    639, // Terrakion
    640, // Virizion
    641, // Tornadus
    642, // Thundurus
    643, // Reshiram
    644, // Zekrom
    645, // Landorus
    646, // Kyurem
    716, // Xerneas
    717, // Yveltal
    718, // Zygarde
    772, // Type: Null
    773, // Silvally
    785, // Tapu Koko
    786, // Tapu Lele
    787, // Tapu Bulu
    788, // Tapu Fini
    789, // Cosmog
    790, // Cosmoem
    791, // Solgaleo
    792, // Lunala
    800, // Necrozma
    888, // Zacian
    889, // Zamacenta
    890, // Eternatus
    891, // Kubfu
    892, // Urshifu
    894, // Regieleki
    895, // Regidrago
    896, // Glastrier
    897, // Spectrier
    898, // Calyrex
];

export const MythicalType = [
    151, // Mew
    251, // Celebi
    385, // Jirachi
    386, // Deoxys
    489, // Phione
    490, // Manaphy
    491, // Darkrai
    492, // Shaymin
    493, // Arceus
    494, // Victini
    647, // Keldeo
    648, // Meloetta
    649, // Genesect
    719, // Diancie
    720, // Hoopa
    721, // Volcanion
    801, // Magearna
    802, // Marshadow
    807, // Zeraora
    808, // Meltan
    809, // Melmetal
    893, // Zarude
];

// Spinda Spots min positions
export const SpindaSpotsMinPosition = {
    spotTopLeft: { x: 0, y: 0 },
    spotTopRight: { x: 24, y: 2 },
    spotBottomLeft: { x: 3, y: 18 },
    spotBottomRight: { x: 15, y: 18 },
};

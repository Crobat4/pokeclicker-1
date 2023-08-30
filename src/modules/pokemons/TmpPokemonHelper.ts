import { getEvolution } from './EvoHelpers';
import {
    calcNativeRegion,
    calcUniquePokemonsByRegion,
    displayName,
    getImage,
    getPokeballImage,
    getPokemonById,
    getPokemonByName,
    incrementPokemonStatistics,
    typeIdToString,
    typeStringToId,
    // Crobat Fork
    generateSpindaSpots,
    getSpindaMask,
    getTypeColors,
    // END Crobat Fork
    hasMegaEvolution,
    getMegaStones,
} from './PokemonHelper';

// Tmp class for scripts/pokemons/PokemonHelper to extend

export default class TmpPokemonHelper {
    static calcNativeRegion = calcNativeRegion;
    static getEvolution = getEvolution;
    static getPokemonById = getPokemonById;
    static getPokemonByName = getPokemonByName;
    static typeStringToId = typeStringToId;
    static typeIdToString = typeIdToString;
    static getImage = getImage;
    static calcUniquePokemonsByRegion = calcUniquePokemonsByRegion;
    static getPokeballImage = getPokeballImage;
    static incrementPokemonStatistics = incrementPokemonStatistics;
    static displayName = displayName;
    // Crobat Fork
    static generateSpindaSpots = generateSpindaSpots;
    static getSpindaMask = getSpindaMask;
    static getTypeColors = getTypeColors;
    // END Crobat Fork
    static hasMegaEvolution = hasMegaEvolution;
    static getMegaStones = getMegaStones;
}

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
    // END Crobat Fork
    hasMegaEvolution,
    hasUncaughtMegaEvolution,
    getMegaStones,
    hasGigantamaxForm,
    hasUncaughtGigantamaxForm,
    isGigantamaxForm,
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
    // END Crobat Fork
    static hasMegaEvolution = hasMegaEvolution;
    static hasUncaughtMegaEvolution = hasUncaughtMegaEvolution;
    static getMegaStones = getMegaStones;
    static hasGigantamaxForm = hasGigantamaxForm;
    static hasUncaughtGigantamaxForm = hasUncaughtGigantamaxForm;
    static isGigantamaxForm = isGigantamaxForm;
}

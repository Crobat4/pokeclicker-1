import { VitaminType } from '../GameConstants';

export default class VitaminController {
    public static currentlySelected = ko.observable(VitaminType.Protein).extend({ numeric: 0 });
    public static add = ko.observable(true).extend({ boolean: null });
    public static multiplier = ['×1', '×5', 'x10', 'Max'];
    public static multiplierIndex = ko.observable(0);

    public static incrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + 1) % this.multiplier.length);
    }

    public static decrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + this.multiplier.length - 1) % this.multiplier.length);
    }

    public static getMultiplier() {
        return Number(this.multiplier[this.multiplierIndex()].replace(/\D/g, '')) || Infinity;
    }

    public static getImage(vitaminType) {
        const vitaminName = VitaminType[vitaminType ?? this.currentlySelected()];
        return `assets/images/items/vitamin/${vitaminName}.png`;
    }

    public static giveAllVitamins(vitaminType: VitaminType, pokemonFilteredList) {
        const maxVitamin = (player.highestRegion() + 1) * 5;
        for (let i = 0; i < pokemonFilteredList.length && player.itemList[VitaminType[vitaminType]]() >= maxVitamin; i++) {
            const pokemon = pokemonFilteredList[i];
            if (pokemon.vitaminUsesRemaining() > 0) {
                pokemon.useVitamin(vitaminType, Infinity);
            }
        }
    }

    public static takeAllVitamins(vitaminType: VitaminType, pokemonFilteredList) {
        for (let i = 0; i < pokemonFilteredList.length; i++) {
            const pokemon = pokemonFilteredList[i];
            if (pokemon.vitaminsUsed[vitaminType]() > 0) {
                pokemon.removeVitamin(vitaminType, Infinity);
            }
        }
    }
}

import { Saveable } from '../DataStore/common/Saveable';
import BerryType from '../enums/BerryType';
import {
    Currency, MegaStoneType, Pokeball, Region, VitaminType,
} from '../GameConstants';
import { ItemList } from '../items/ItemList';
import KeyItemType from '../enums/KeyItemType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { pokemonMap } from '../pokemons/PokemonList';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import RedeemableCode from './RedeemableCode';
import GameHelper from '../GameHelper';
import Amount from '../wallet/Amount';
import Item from '../items/Item';
// Crobat Fork
import * as GameConstants from '../GameConstants';
import Rand from '../utilities/Rand';
import OakItemType from '../enums/OakItemType';
import BadgeEnums from '../enums/Badges';

export default class RedeemableCodes implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'redeemableCodes';

    codeList: RedeemableCode[];

    constructor() {
        this.codeList = [
            new RedeemableCode('farming-quick-start', -83143881, false, async () => { // FARMINGBOOST
                // Give the player 10k farming points, 100 Cheri berries
                App.game.wallet.gainFarmPoints(10000);
                App.game.farming.gainBerry(BerryType.Cheri, 100, false);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 10,000 Farm Points and 100 Cheri Berries!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }),
            new RedeemableCode('shiny-charmer', -318017456, false, async () => { // OOOSHINY
                // Select a random Pokemon to give the player as a shiny
                const pokemon = pokemonMap.randomRegion(player.highestRegion());
                // Floor the ID, only give base/main Pokemon forms
                const idToUse = Math.floor(pokemon.id);
                App.game.party.gainPokemonById(idToUse, true, true);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: `✨ You found a shiny ${pokemonMap[idToUse].name}! ✨`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }),
            new RedeemableCode('great-balls', -1761161712, false, async () => { // THE-GREATEST-POKEBALL
                // Give the player 10 Great Balls
                App.game.pokeballs.gainPokeballs(Pokeball.Greatball, 10);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 10 Great Balls!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }),
            new RedeemableCode('typed-held-item', -2046503095, false, async () => {
                // Give the player 3 random typed held items
                const items = Object.values(ItemList).filter((i) => i.constructor.name === 'TypeRestrictedAttackBonusHeldItem')
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                items.forEach((i) => i.gain(1));
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 3 random Held Items, that boosts a specific type!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MaxRegionRequirement(Region.johto)),

            new RedeemableCode('eon-ticket', 528036885, false, async () => {
                // Give the player the Eon Ticket
                App.game.keyItems.gainKeyItem(KeyItemType.Eon_ticket, true);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You got an Eon Ticket!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MaxRegionRequirement(Region.hoenn)),

            new RedeemableCode('ampharosite', -512934122, false, async () => {
                // Give the player Mega Ampharos
                player.gainMegaStone(MegaStoneType.Ampharosite);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained an Ampharosite!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MultiRequirement([new MaxRegionRequirement(Region.kalos), new ObtainedPokemonRequirement('Ampharos')])),
            new RedeemableCode('refund-vitamins', 1316108150, false, async () => {
                const vitamins = GameHelper.enumStrings(VitaminType).map((name) => ItemList[name]);
                const toRefund = vitamins.map((item) => {
                    const totalUsed = App.game.party.caughtPokemon.reduce(
                        (total, pokemon) => total + pokemon.vitaminsUsed[item.type](), 0,
                    );
                    const totalNotUsed = player.itemList[item.name]();
                    const capPriceAt = Math.ceil(Math.log(100) / Math.log(item.multiplier));

                    let n = 0;
                    if (totalUsed + totalNotUsed > capPriceAt) {
                        n = totalUsed > capPriceAt
                            ? totalNotUsed
                            : totalNotUsed + totalUsed - capPriceAt;
                    }

                    return [item, n];
                }) as [Item, number][];

                const refundAmounts = toRefund.reduce((totals, [item, n]) => {
                    if (totals[item.currency] === undefined) {
                        // eslint-disable-next-line no-param-reassign
                        totals[item.currency] = 0;
                    }
                    const price = Math.round(item.basePrice * (player.itemMultipliers[item.saveName] || 1));
                    // eslint-disable-next-line no-param-reassign
                    totals[item.currency] += n * price;

                    return totals;
                }, {} as Record<Currency, number>);

                const refund = await Notifier.confirm({
                    title: 'Refund Unused Vitamins',
                    message: `<p class='text-center'>This will refund ${
                        toRefund.map(([item, n]) => `${
                            n.toLocaleString('en-US')
                        } ${item.name}`).join(', ')
                    } for a total of ${
                        Object.entries(refundAmounts)
                            .map(([curr, amt]) => `${amt.toLocaleString('en-US')} ${Currency[curr]}`)
                            .join(', ')
                    }.</br></br>You can only do this once.</br>Are you sure?</p>`,
                });

                if (refund) {
                    toRefund.forEach(([item, n]) => {
                        player.loseItem(item.name, n);
                    });

                    Object.entries(refundAmounts).forEach(([curr, amt]) => {
                        const refundAmt = new Amount(amt, Number(curr));
                        App.game.wallet.addAmount(refundAmt, true);
                    });

                    Notifier.notify({
                        title: 'Code Activated!',
                        message: 'All unused vitamins refunded.',
                        type: NotificationConstants.NotificationOption.success,
                        timeout: 1e4,
                    });
                }

                return refund;
            }),
            /* Crobat Fork Codes */
            // Rotom (Crobat)
            // eslint-disable-next-line consistent-return
            new RedeemableCode('rotom-crobat', 855696596, false, async () => { // CROBATISBASED
                const successfulCode = this.pokemonCode('Rotom (Crobat)', BadgeEnums.Beacon, 'Rotom');
                // Needs to be undefined to be counted as code reedemed
                // undefined is counted as false so it need "=== false"
                if (successfulCode === false) {
                    return false;
                }
            }),
            // Surfing Pikachu
            // eslint-disable-next-line consistent-return
            new RedeemableCode('surfing-pikachu', -1621513525, false, async () => { // FATRATDROWNED
                const successfulCode = this.pokemonCode('Surfing Pikachu', BadgeEnums.Earth, 'Pikachu');
                if (successfulCode === false) {
                    return false;
                }
            }),
            // Unown C-R-O-B-A-T
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-c', 64085966, false, async () => { // CHASE
                const successfulCode = this.pokemonCode('Unown (C)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-r', -70124742, false, async () => { // REASSURE
                const successfulCode = this.pokemonCode('Unown (R)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-o', -933339908, false, async () => { // OBSERVE
                const successfulCode = this.pokemonCode('Unown (O)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-b', 2034612, false, async () => { // BEAR
                const successfulCode = this.pokemonCode('Unown (B)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-a', 62423425, false, async () => { // ANGRY
                const successfulCode = this.pokemonCode('Unown (A)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
            // eslint-disable-next-line consistent-return
            new RedeemableCode('unown-t', 2571185, false, async () => { // TELL
                const successfulCode = this.pokemonCode('Unown (T)', BadgeEnums.Rising);
                if (successfulCode === false) {
                    return false;
                }
            }),
        ];
    }

    /**
     * Had to put this here because some errors when bringing the function from PokemonFactory.ts
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    // eslint-disable-next-line class-methods-use-this
    generateShiny(chance: number, skipBonus = false): boolean {
        const bonus = skipBonus ? 1 : App.game.multiplier.getBonus('shiny');

        if (Rand.chance(chance / bonus)) {
            App.game.oakItems.use(OakItemType.Shiny_Charm);
            return true;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    checkRegion(pokemon, currentRegion) {
        if (currentRegion >= pokemon.nativeRegion) {
            return true;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    checkOriginalForm(originalForm) {
        // If MissingNo., no original form is required (This is mostly for the Unowns)
        if (App.game.party.alreadyCaughtPokemon(originalForm.id) || originalForm.id === 0) {
            return true;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    checkBadge(badge) {
        if (App.game.badgeCase.hasBadge(badge)) {
            return true;
        }
        return false;
    }

    // eslint-disable-next-line consistent-return
    pokemonCode(pokemonName, badge, originalName = 'MissingNo.') {
        const shiny = this.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        const pokemon = pokemonMap[pokemonName];
        const originalForm = pokemonMap[originalName];
        // const badge = BadgeEnums.Earth;
        const badgeSatisfied = this.checkBadge(badge);
        const regionSatisfied = this.checkRegion(pokemon, player.highestRegion());
        const originalFormSatisfied = this.checkOriginalForm(originalForm);
        if (regionSatisfied && originalFormSatisfied && badgeSatisfied) {
            App.game.party.gainPokemonById(pokemon.id, shiny, true);
            // Notify that the code was activated successfully
            Notifier.notify({
                title: 'Code activated!',
                message: `You obtained a${shiny ? ' shiny' : ''} ${pokemon.name}!`,
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
            });
        } else {
            // Notify that the region of code pokemon is not reached yet
            const messageGeneral = 'You can\'t get this Pokémon yet!';
            const messageOriginalForm = `Requires ${originalForm.name} to be caught.`;
            const messageBadge = `Requires the ${GameConstants.camelCaseToString(BadgeEnums[badge])} Badge.`;
            const mergeMessages = messageGeneral + (!originalFormSatisfied ? `\n${messageOriginalForm}` : '') + (!badgeSatisfied ? `\n${messageBadge}` : '');
            const messageRegion = 'You need to progress further to unlock this pokemon.';
            Notifier.notify({
                message: regionSatisfied ? mergeMessages : messageRegion,
                type: NotificationConstants.NotificationOption.danger,
                timeout: 1e4,
            });
            return false;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    isDiscordCode(code: string): boolean {
        return /^\w{4}-\w{4}-\w{4}$/.test(code);
    }

    enterCode(code: string): void {
        // If this is a Discord code, send it to the Discord class to check
        if (App.game.discord.enabled && this.isDiscordCode(code)) {
            App.game.discord.enterCode(code);
            return;
        }

        const hash = this.hash(code);

        const redeemableCode = this.codeList.find((c) => c.hash === hash);

        if (!redeemableCode) {
            Notifier.notify({
                message: `Invalid code ${code}`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        redeemableCode.redeem();
    }

    /**
     * Insecure hash, but should keep some of the nosy people out.
     * @param text
     */
    // eslint-disable-next-line class-methods-use-this
    hash(text: string): number {
        let hash = 0;
        let i = 0;
        let chr = 0;
        if (text.length === 0) {
            return hash;
        }

        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            // eslint-disable-next-line no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // eslint-disable-next-line no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    fromJSON(json: string[]): void {
        if (json == null) {
            return;
        }

        json.forEach((name) => {
            const foundCode = this.codeList.find((code) => code.name === name);

            if (foundCode) {
                foundCode.isRedeemed = true;
            }
        });
    }

    toJSON(): Record<string, any> {
        return this.codeList.reduce((res: string[], code: RedeemableCode) => {
            if (code.isRedeemed) {
                res.push(code.name);
            }
            return res;
        }, []);
    }
}

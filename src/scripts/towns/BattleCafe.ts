class BattleCafe extends TownContent {
    constructor() {
        super([new ObtainedPokemonRequirement('Milcery')]);
    }

    public cssClass() {
        return 'btn btn-info';
    }

    public onclick(): void {
        $('#battleCafeModal').modal('show');
    }

    public text() {
        return 'Battle Café';
    }
}

class BattleCafeSaveObject implements Saveable {
    saveKey = 'BattleCafe';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            spinsLeft: BattleCafeController.spinsLeft(),
        };
    }
    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        BattleCafeController.spinsLeft(json.spinsLeft ?? BattleCafeController.baseMaxSpins);
    }

}

class BattleCafeController {
    static defaultRecharge = 1;
    static selectedSweet = ko.observable<GameConstants.AlcremieSweet>(GameConstants.AlcremieSweet['Strawberry Sweet']);
    static baseMaxSpins = 3;
    static spinsLeft = ko.observable<number>(BattleCafeController.baseMaxSpins);
    static isSpinning = ko.observable<boolean>(false);
    static clockwise = ko.observable<boolean>(false);

    /*
    static calcMaxSpins() : number {
        // Give additional max spins for each sweet type completed
        return this.baseMaxSpins + GameHelper.enumStrings(GameConstants.AlcremieSweet)
            .filter((s) => BattleCafeController.getCaughtStatus(GameConstants.AlcremieSweet[s])() >= CaughtStatus.Caught)
            .length;
    }
    */

    static checkAllSweetsCompleted() {
        const totalSweets = GameHelper.enumStrings(GameConstants.AlcremieSweet).length;
        const currentCompletedSweets = GameHelper.enumStrings(GameConstants.AlcremieSweet)
            .filter((s) => BattleCafeController.getCaughtStatus(GameConstants.AlcremieSweet[s])() >= CaughtStatus.Caught)
            .length;
        if (currentCompletedSweets == totalSweets) {
            return true;
        }
        return false;
    }

    static checkAllSweetsShiny() {
        const totalSweets = GameHelper.enumStrings(GameConstants.AlcremieSweet).length;
        const currentShinySweets = GameHelper.enumStrings(GameConstants.AlcremieSweet)
            .filter((s) => BattleCafeController.getCaughtStatus(GameConstants.AlcremieSweet[s])() >= CaughtStatus.CaughtShiny)
            .length;
        if (currentShinySweets == totalSweets) {
            return true;
        }
        return false;
    }

    public static spin(clockwise: boolean) {
        if (!BattleCafeController.canSpin()) {
            return;
        }

        BattleCafeController.clockwise(clockwise);
        BattleCafeController.isSpinning(true);
        const spinTime = +$('#battleCafeDuration').val();
        const sweet = BattleCafeController.selectedSweet();


        setTimeout(() => {
            BattleCafeController.isSpinning(false);
            BattleCafeController.unlockAlcremie(clockwise, spinTime, sweet);
            BattleCafeController.spinsLeft(BattleCafeController.spinsLeft() - 1);
            BattleCafeController.getPrice(sweet).forEach(b => GameHelper.incrementObservable(App.game.farming.berryList[b.berry], b.amount * -1));
        },
        spinTime * 1000);
    }

    private static unlockAlcremie(clockwise: boolean, spinTime: number, sweet: GameConstants.AlcremieSweet) {
        let spin: GameConstants.AlcremieSpins;
        if (spinTime == 3600) {
            (new PokemonItem('Milcery (Cheesy)', 0)).gain(1);
            return;
        }
        if (DayCycle.currentDayCyclePart() === DayCyclePart.Dusk && !clockwise && spinTime > 10) {
            spin = GameConstants.AlcremieSpins.at5Above10;
        } else if ([DayCyclePart.Night, DayCyclePart.Dawn].includes(DayCycle.currentDayCyclePart())) {
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseAbove5;
            }
        } else { // Is day
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseAbove5;
            }
        }
        BattleCafeController.evolutions[sweet][spin].gain(1);
    }

    /* *
     * The period for spin recharges (in hours)
     */
    // public static period = 2;

    /**
     * Recharges spin
     */
    public static rechargeSpin(hour: number, newDay = false): void {
        if (newDay) { // Recharge 3 spins daily
            let recharge = BattleCafeController.spinsLeft() + 3;
            if (recharge > BattleCafeController.calcMaxSpins()) {
                recharge = BattleCafeController.calcMaxSpins();
            }
            BattleCafeController.spinsLeft(recharge);
        } else { // Recharge a spin every 2 hours (1 if all sweets are completed)
            const period = BattleCafeController.checkAllSweetsCompleted() ? 1 : 2;
            if ((hour % period) == 0) {
                const recharge = BattleCafeController.spinsLeft() + BattleCafeController.defaultRecharge;
                BattleCafeController.spinsLeft(Math.min(BattleCafeController.calcMaxSpins(), recharge));
            }
        }
    }

    private static canSpin() {
        if (BattleCafeController.selectedSweet() == undefined) {
            Notifier.notify({
                message: 'No sweet selected.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (BattleCafeController.isSpinning()) {
            Notifier.notify({
                message: 'Already spinning.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (BattleCafeController.spinsLeft() < 1) {
            Notifier.notify({
                message: 'No spins left.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (+$('#battleCafeDuration').val() > 20 && +$('#battleCafeDuration').val() != 3600) {
            Notifier.notify({
                message: 'Can\'t spin for more than 20 seconds',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (+$('#battleCafeDuration').val() < 1) {
            Notifier.notify({
                message: 'It only counts as spinning, if you spin for some time...',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!BattleCafeController.canBuySweet(BattleCafeController.selectedSweet())()) {
            Notifier.notify({
                message: 'Not enough berries for this sweet.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    public static canBuySweet(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            return BattleCafeController.getPrice(sweet).every(b => {
                if (App.game.farming.berryList[b.berry]() < b.amount) {
                    return false;
                }
                return true;
            });
        });
    }

    public static getCaughtStatus(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<CaughtStatus> {
        return ko.pureComputed(() => {
            return Math.min(...Object.values(BattleCafeController.evolutions[sweet]).map((pokemon: PokemonItem) => pokemon.getCaughtStatus()));
        });
    }

    public static getPokerusStatus(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<GameConstants.Pokerus> {
        return ko.pureComputed(() => {
            return Math.min(...Object.values(BattleCafeController.evolutions[sweet]).map((pokemon: PokemonItem) => pokemon.getPokerusStatus()));
        });
    }


    private static getPrice(sweet: GameConstants.AlcremieSweet) : {berry: BerryType, amount: number}[] {
        let discount = 1;
        // Check if all sweets have Shiny status
        if (BattleCafeController.checkAllSweetsShiny()) {
            discount = 2;
        }
        switch (sweet) {
            // should be easy to do, without touching the farm
            case GameConstants.AlcremieSweet['Strawberry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: Math.ceil(500 / discount)},
                    {berry: BerryType.Leppa, amount: Math.ceil(500 / discount)},
                    {berry: BerryType.Razz, amount: Math.ceil(50 / discount)},
                ];
            // max gen 2
            case GameConstants.AlcremieSweet['Clover Sweet']:
                return [
                    {berry: BerryType.Wepear, amount: Math.ceil(1000 / discount)},
                    {berry: BerryType.Aguav, amount: Math.ceil(2000 / discount)},
                    {berry: BerryType.Lum, amount: Math.ceil(10 / discount)},
                ];
            // max gen 3
            case GameConstants.AlcremieSweet['Star Sweet']:
                return [
                    {berry: BerryType.Pinap, amount: Math.ceil(2000 / discount)},
                    {berry: BerryType.Grepa, amount: Math.ceil(100 / discount)},
                    {berry: BerryType.Nomel, amount: Math.ceil(50 / discount)},
                ];
            // max gen 4
            case GameConstants.AlcremieSweet['Berry Sweet']:
                return [
                    {berry: BerryType.Passho, amount: Math.ceil(1000 / discount)},
                    {berry: BerryType.Yache, amount: Math.ceil(75 / discount)},
                    {berry: BerryType.Coba, amount: Math.ceil(150 / discount)},

                ];
            // max gen 4
            case GameConstants.AlcremieSweet['Ribbon Sweet']:
                return [
                    {berry: BerryType.Bluk, amount: Math.ceil(3000 / discount)},
                    {berry: BerryType.Pamtre, amount: Math.ceil(50 / discount)},
                    {berry: BerryType.Payapa, amount: Math.ceil(100 / discount)},
                ];
            // max gen 5
            case GameConstants.AlcremieSweet['Flower Sweet']:
                return [
                    {berry: BerryType.Figy, amount: Math.ceil(15000 / discount)},
                    {berry: BerryType.Iapapa, amount: Math.ceil(20000 / discount)},
                    {berry: BerryType.Liechi, amount: Math.ceil(3 / discount)},
                ];
            // max gen 5
            case GameConstants.AlcremieSweet['Love Sweet']:
                return [
                    {berry: BerryType.Haban, amount: Math.ceil(200 / discount)},
                    {berry: BerryType.Roseli, amount: Math.ceil(700 / discount)},
                    {berry: BerryType.Lansat, amount: Math.ceil(5 / discount)},
                ];

        }
    }

    public static calcMaxSpins(/*sweet: GameConstants.AlcremieSweet*/): number {
        /*
        const maxSpins = BattleCafeController.getPrice(sweet)
            .map((cost) => Math.floor(App.game.farming.berryList[cost.berry]() / cost.amount));
        return Math.min(...maxSpins);
        */

        // Give additional max spins for each sweet type completed
        return this.baseMaxSpins + GameHelper.enumStrings(GameConstants.AlcremieSweet)
            .filter((s) => BattleCafeController.getCaughtStatus(GameConstants.AlcremieSweet[s])() >= CaughtStatus.Caught)
            .length;
    }

    public static evolutions: Record<GameConstants.AlcremieSweet, Record<GameConstants.AlcremieSpins, PokemonItem>> = {
        [GameConstants.AlcremieSweet['Strawberry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Strawberry Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Love Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Love Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Love Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Love Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Love Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Love Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Berry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Berry Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Berry Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Berry Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Berry Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Berry Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Clover Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Clover Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Clover Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Clover Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Clover Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Clover Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Flower Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Flower Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Flower Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Flower Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Flower Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Flower Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Star Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Star Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Star Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Star Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Star Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Star Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Ribbon Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Ribbon Rainbow)'),
        },

    };
}

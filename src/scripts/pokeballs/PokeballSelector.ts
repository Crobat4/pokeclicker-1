class PokeballSelector {
    public pokeball: KnockoutObservable<GameConstants.Pokeball>;

    constructor(
        public type: GameConstants.PokeballSelector,
        public name: string,
        public shortName: string,
        public description: string,
        //public unlockRequirement: Requirement | MultiRequirement = new MultiRequirement(),
        pokeball = GameConstants.Pokeball.None
    ) {
        this.pokeball = ko.observable(pokeball);
    }

    /*
    public unlocked() {
        return this.unlockRequirement.isCompleted();
    }
    */
}

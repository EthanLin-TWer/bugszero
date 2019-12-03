export class Player {
  private readonly _name;
  private goldCoins: number = 0;

  constructor(name) {
    this._name = name;

    console.log(`${this._name} was added`);
  }

  get name() {
    return this._name;
  }

  increaseAGoldCoin() {
    this.goldCoins += 1;
  }
}

export class Player {
  private readonly _name;
  private _goldCoins: number = 0;
  private place: number = 0;

  constructor(name) {
    this._name = name;

    console.log(`${this._name} was added`);
  }

  // name
  get name() {
    return this._name;
  }

  // gold coins
  increaseAGoldCoin() {
    this._goldCoins += 1;
  }

  get goldCoins(): number {
    return this._goldCoins;
  }
}

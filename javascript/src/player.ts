export class Player {
  private readonly _name;
  private _goldCoins: number = 0;
  private _place: number = 0;
  private _isInPenaltyBox: boolean = false;

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

  // place
  moveForward(places): void {
    this._place = (this._place + places) % 12;
    console.log(`${this.name}'s new location is ${this.place}`);
  }

  get place(): number {
    return this._place;
  }

  sendToPenaltyBox(): void {
    this._isInPenaltyBox = true
  }
}

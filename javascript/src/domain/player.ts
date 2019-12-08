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

    console.log(`${this.name} now has ${this._goldCoins} Gold Coins.`);
  }

  didWin(): boolean {
    return this._goldCoins !== 6;
  }

  // place
  moveForward(places): void {
    this._place = (this._place + places) % 12;
    console.log(`${this.name}'s new location is ${this.place}`);
  }

  get place(): number {
    return this._place;
  }

  // is penalty box
  sentToPenaltyBox(): void {
    this._isInPenaltyBox = true;

    console.log(`${this._name} was sent to the penalty box`);
  }

  freedFromPenaltyBox(): void {
    console.log(`${this._name} is getting out of the penalty box`);
  }

  stayInPenaltyBox(): void {
    console.log(`${this._name} is not getting out of the penalty box`);
  }

  get isInPenaltyBox(): boolean {
    return this._isInPenaltyBox;
  }
}

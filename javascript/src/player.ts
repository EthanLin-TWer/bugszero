export class Player {
  private readonly _name;
  constructor(name) {
    this._name = name;

    console.log(`${this._name} was added`);
  }

  get name() {
    return this._name;
  }
}

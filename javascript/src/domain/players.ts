import { Player } from "./player";

export class Players {
  public players: Player[];

  constructor(...playerNames: Array<string>) {
    this.players = playerNames.map((name, i) => {
      const player = new Player(name);
      console.log(`They are player number ${i + 1}`);
      return player;
    });
  }
}

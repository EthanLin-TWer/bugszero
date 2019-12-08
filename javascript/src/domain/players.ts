import { Player } from "./player";

export class Players {
  public players: Player[];
  private currentPlayerIndex: number = 0;

  constructor(...playerNames: Array<string>) {
    this.players = playerNames.map((name, i) => {
      const player = new Player(name);
      console.log(`They are player number ${i + 1}`);
      return player;
    });
  }

  public setNextPlayer(): void {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
}

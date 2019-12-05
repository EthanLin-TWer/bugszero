import { Game, startTheGame } from "./game";

export function gameRunner(randomInt) {
  // a simulator of a game
  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  startTheGame(game, randomInt);
}

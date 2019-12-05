import { Game } from "./game";

export function gameRunner(randomInt) {
  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  game.start(randomInt);
}

import { Game } from "./game";

export function gameRunner(simulator, newSimulator) {
  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  game.start(simulator, newSimulator);
}

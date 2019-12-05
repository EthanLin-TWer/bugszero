import { Game } from "./game";

export function gameRunner(randomInt) {
  // a simulator of a game

  let notAWinner = false;

  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  do {
    const shouldAnswerQuestion = game.roll(randomInt(6));

    if (randomInt(10) == 7) {
      notAWinner = game.wrongAnswer();
      game.setNextPlayer();
    } else {
      notAWinner = game.wasCorrectlyAnswered();
    }
  } while (notAWinner);
}

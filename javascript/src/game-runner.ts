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

    const randomToSimulateAnswerCorrectness = randomInt(10) == 7;
    if (randomToSimulateAnswerCorrectness) {
      notAWinner = game.wrongAnswer();
    } else {
      notAWinner = game.wasCorrectlyAnswered();
    }
    game.setNextPlayer();
  } while (notAWinner);
}

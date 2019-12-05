import { Game } from "./game";

export function gameRunner(randomInt) {
  // a simulator of a game
  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  let notAWinner = false;
  do {
    const shouldAnswerQuestion = game.roll(randomInt(6));
    const isGivingCorrectAnswer = randomInt(10) == 7;

    if (shouldAnswerQuestion) {
      if (isGivingCorrectAnswer) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.correctAnswer();
      }
    }
    game.setNextPlayer();
  } while (notAWinner);
}

import { Player } from "./domain/player";
import { Simulator } from "./simulator";
import { QuestionManager } from "./domain/question-manager";

export const QuestionTypes = {
  Pop: "Pop",
  Science: "Science",
  Sports: "Sports",
  Rock: "Rock",
  History: "History",
  Blues: "Blues"
};

export class Game {
  questions: object = {
    [QuestionTypes.Rock]: [],
    [QuestionTypes.Sports]: [],
    [QuestionTypes.Pop]: [],
    [QuestionTypes.Science]: [],
    [QuestionTypes.History]: [],
    [QuestionTypes.Blues]: []
  };

  players: Player[] = [];
  currentPlayer: number = 0;
  private questionManager: QuestionManager;

  constructor() {
    this.questionManager = new QuestionManager();
    this.questions = this.questionManager.questions;
  }

  add(playerName) {
    this.players.push(new Player(playerName));
    console.log(`They are player number ${this.players.length}`);
  }

  start(simulator: Simulator): void {
    let notAWinner = false;

    do {
      const rolling = simulator.simulateRolling();
      const isWrongAnswer = simulator.simulateAnswering();

      const shouldAnswerQuestionThisRound = this.roll(rolling);
      if (shouldAnswerQuestionThisRound) {
        notAWinner = isWrongAnswer ? this.wrongAnswer() : this.correctAnswer();
      }
      this.setNextPlayer();
    } while (notAWinner);
  }

  private currentCategory() {
    // @ts-ignore
    return Object.values(QuestionTypes)[
      this.getCurrentPlayer().place % Object.keys(QuestionTypes).length
    ];
  }

  private askQuestion() {
    console.log(`The category is ${this.currentCategory()}`);

    const nextQuestion = this.questions[this.currentCategory()].shift();
    console.log(nextQuestion);
  }

  private roll(roll): boolean {
    console.log(`${this.getCurrentPlayerName()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.getCurrentPlayer().isInPenaltyBox) {
      if (roll % 2 != 0) {
        this.getCurrentPlayer().freedFromPenaltyBox();
        this._movePlayerAndAskQuestion(roll);
        return true;
      } else {
        console.log(
          `${this.getCurrentPlayerName()} is not getting out of the penalty box`
        );
        return false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
      return true;
    }
  }

  private _movePlayerAndAskQuestion(roll) {
    this.getCurrentPlayer().moveForward(roll);
    this.askQuestion();
  }

  private correctAnswer() {
    console.log("Answer was correct!!!!");

    this.getCurrentPlayer().increaseAGoldCoin();
    return this.didCurrentPlayerWin();
  }

  private wrongAnswer() {
    console.log("Question was incorrectly answered");
    this.getCurrentPlayer().sentToPenaltyBox();

    return true;
  }

  private setNextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0;
    }
  }

  private didCurrentPlayerWin() {
    return this.getCurrentPlayer().didWin();
  }

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  private getCurrentPlayerName() {
    return this.getCurrentPlayer().name;
  }
}

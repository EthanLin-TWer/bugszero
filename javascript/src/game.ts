import { Player } from "./domain/player";
import { Simulator } from "./simulator";

const QuestionTypes = {
  Pop: "Pop",
  Science: "Science",
  Sports: "Sports",
  Rock: "Rock"
};

export class Game {
  questions: object = {
    [QuestionTypes.Rock]: [],
    sports: [],
    pops: [],
    sciences: []
  };

  players: Player[] = [];
  currentPlayer: number = 0;

  constructor() {
    for (let i = 0; i < 50; i++) {
      // @ts-ignore
      this.questions.pops.push("Pop Question " + i);
      // @ts-ignore
      this.questions.sciences.push("Science Question " + i);
      // @ts-ignore
      this.questions.sports.push("Sports Question " + i);
      // @ts-ignore
      this.questions[QuestionTypes.Rock].push(this.createRockQuestion(i));
    }
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
    const questionTypes = [
      QuestionTypes.Pop,
      QuestionTypes.Science,
      QuestionTypes.Sports,
      QuestionTypes.Rock
    ];

    // TODO: [Linesh][2019/12/7] refactor this
    return questionTypes[
      this.getCurrentPlayer().place % Object.keys(QuestionTypes).length
    ];
  }

  private askQuestion() {
    console.log(`The category is ${this.currentCategory()}`);
    if (this.currentCategory() == "Pop") {
      // @ts-ignore
      console.log(this.questions.pops.shift());
    }
    if (this.currentCategory() == "Science") {
      // @ts-ignore
      console.log(this.questions.sciences.shift());
    }
    if (this.currentCategory() == "Sports") {
      // @ts-ignore
      console.log(this.questions.sports.shift());
    }
    if (this.currentCategory() == "Rock") {
      // @ts-ignore
      console.log(this.questions[QuestionTypes.Rock].shift());
    }
  }

  private createRockQuestion(index) {
    return `Rock Question ${index}`;
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

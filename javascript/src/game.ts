import { Player } from "./domain/player";
import { GameSimulator } from "./gameSimulator";
import { Decks } from "./domain/decks";

export class Game {
  private players: Player[] = [];
  private currentPlayer: number = 0;
  private decks: Decks;

  constructor() {
    this.decks = new Decks(50);
  }

  add(playerName) {
    this.players.push(new Player(playerName));
    console.log(`They are player number ${this.players.length}`);
  }

  start(simulator: GameSimulator): void {
    let notAWinner = false;

    do {
      const rolling = simulator.simulateRolling();
      const isWrongAnswer = simulator.simulateAnswering();

      const shouldAnswerQuestionThisRound = this.roll(rolling);
      if (shouldAnswerQuestionThisRound) {
        this.askQuestion();
        notAWinner = isWrongAnswer ? this.wrongAnswer() : this.correctAnswer();
      }
      this.setNextPlayer();
    } while (notAWinner);
  }

  private roll(roll): boolean {
    console.log(`${this.getCurrentPlayer().name} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (!this.getCurrentPlayer().isInPenaltyBox) {
      this.getCurrentPlayer().moveForward(roll);
      return true;
    }

    const isGettingOutOfPenaltyBox = roll % 2 !== 0;
    if (isGettingOutOfPenaltyBox) {
      this.getCurrentPlayer().freedFromPenaltyBox();
      this.getCurrentPlayer().moveForward(roll);
      return true;
    }

    this.getCurrentPlayer().stayInPenaltyBox();
    return false;
  }

  private askQuestion(): void {
    const position = this.getCurrentPlayer().place;
    const question = this.decks.getNextQuestion(position);
    console.log(question);
  }

  private correctAnswer(): boolean {
    console.log("Answer was correct!!!!");

    this.getCurrentPlayer().increaseAGoldCoin();
    return this.getCurrentPlayer().didWin();
  }

  private wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");

    this.getCurrentPlayer().sentToPenaltyBox();
    return true;
  }

  private setNextPlayer(): void {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0;
    }
  }

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }
}

import { Player } from "./domain/player";
import { GameSimulator } from "./gameSimulator";
import { Decks } from "./domain/decks";
import { Players } from "./domain/players";

export class Game {
  private readonly players: Players;
  private decks: Decks;

  constructor(...playerNames: Array<string>) {
    this.players = new Players(...playerNames);
    this.decks = new Decks(50);
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
    console.log(`${this.currentPlayer.name} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (!this.currentPlayer.isInPenaltyBox) {
      this.currentPlayer.moveForward(roll);
      return true;
    }

    const isGettingOutOfPenaltyBox = roll % 2 !== 0;
    if (isGettingOutOfPenaltyBox) {
      this.currentPlayer.freedFromPenaltyBox();
      this.currentPlayer.moveForward(roll);
      return true;
    }

    this.currentPlayer.stayInPenaltyBox();
    return false;
  }

  private askQuestion(): void {
    const position = this.currentPlayer.place;
    const question = this.decks.getNextQuestion(position);
    console.log(question);
  }

  private correctAnswer(): boolean {
    console.log("Answer was correct!!!!");

    this.currentPlayer.increaseAGoldCoin();
    return this.currentPlayer.didWin();
  }

  private wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");

    this.currentPlayer.sentToPenaltyBox();
    return true;
  }

  private setNextPlayer(): void {
    this.players.setNextPlayer();
  }

  private get currentPlayer(): Player {
    return this.players.getCurrentPlayer();
  }
}

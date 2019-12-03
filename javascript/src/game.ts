import { Player } from "./player";

export class Game {
  rockQuestions: any[];
  isGettingOutOfPenaltyBox: boolean;
  currentPlayer: number;
  sportsQuestions: any[];
  scienceQuestions: any[];
  inPenaltyBox: any[];
  popQuestions: any[];
  places: any[];
  players: any[];

  constructor() {
    this.players = [];
    this.places = new Array(6);
    this.inPenaltyBox = new Array(6);

    this.popQuestions = [];
    this.scienceQuestions = [];
    this.sportsQuestions = [];
    this.rockQuestions = [];

    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  add(playerName) {
    this.players.push(new Player(playerName));
    this.places[this.getTotalPlayers()] = 0;
    this.inPenaltyBox[this.getTotalPlayers()] = false;

    console.log(`They are player number ${this.players.length}`);
  }

  private getTotalPlayers() {
    return this.players.length - 1;
  }

  currentCategory() {
    if (this.getCurrentPlayerPlace() == 0) return "Pop";
    if (this.getCurrentPlayerPlace() == 4) return "Pop";
    if (this.getCurrentPlayerPlace() == 8) return "Pop";
    if (this.getCurrentPlayerPlace() == 1) return "Science";
    if (this.getCurrentPlayerPlace() == 5) return "Science";
    if (this.getCurrentPlayerPlace() == 9) return "Science";
    if (this.getCurrentPlayerPlace() == 2) return "Sports";
    if (this.getCurrentPlayerPlace() == 6) return "Sports";
    if (this.getCurrentPlayerPlace() == 10) return "Sports";
    return "Rock";
  }

  askQuestion() {
    if (this.currentCategory() == "Pop") {
      console.log(this.popQuestions.shift());
    }
    if (this.currentCategory() == "Science") {
      console.log(this.scienceQuestions.shift());
    }
    if (this.currentCategory() == "Sports") {
      console.log(this.sportsQuestions.shift());
    }
    if (this.currentCategory() == "Rock") {
      console.log(this.rockQuestions.shift());
    }
  }

  createRockQuestion(index) {
    return `Rock Question ${index}`;
  }

  roll(roll) {
    console.log(`${this.getCurrentPlayerName()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          `${this.getCurrentPlayerName()} is getting out of the penalty box`
        );
        this._movePlayerAndAskQuestion(roll);
      } else {
        console.log(
          `${this.getCurrentPlayerName()} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
    }
  }

  _movePlayerAndAskQuestion(roll) {
    this._moveCurrentPlayerForward(roll);

    console.log(`The category is ${this.currentCategory()}`);
    this.askQuestion();
  }

  _moveCurrentPlayerForward(roll) {
    let places = this.getCurrentPlayerPlace() + roll;
    if (places > 11) {
      places = places - 12;
    }
    this.places[this.currentPlayer] = places;
    this.getCurrentPlayer().moveForward(roll);
    console.log(
      `${this.getCurrentPlayerName()}'s new location is ${this.getCurrentPlayerPlace()}`
    );
  }

  wasCorrectlyAnswered() {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        return this.correctAnswer();
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      return this.correctAnswer();
    }
  }

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    console.log(`${this.getCurrentPlayerName()} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  private correctAnswer() {
    console.log("Answer was correct!!!!");
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

    this.getCurrentPlayer().increaseAGoldCoin();
    console.log(
      `${this.getCurrentPlayerName()} now has ${this.getCurrentPlayerGoldCoins()} Gold Coins.`
    );

    return !(this.getCurrentPlayerGoldCoins() == 6);
  }

  private getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  private getCurrentPlayerName() {
    return this.getCurrentPlayer().name;
  }

  private getCurrentPlayerGoldCoins() {
    return this.getCurrentPlayer().goldCoins;
  }

  private getCurrentPlayerPlace() {
    return this.places[this.currentPlayer];
  }
}

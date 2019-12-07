import { Categories, Category } from "./category";
import { Deck } from "./deck";

export class QuestionManager {
  private decks: Array<Deck>;

  constructor() {
    this.decks = Categories.values().map(category => new Deck(category));
  }

  public getNextQuestion(position: number) {
    const category: Category = Categories.in(position);
    const deck: Deck = this.findDeck(category);
    return deck.getNextQuestion();
  }

  private findDeck(category: Category): Deck {
    // @ts-ignore
    return this.decks.find(deck => deck.category === category);
  }
}

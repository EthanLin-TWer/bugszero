import { Categories, Category } from "./category";
import { Deck } from "./deck";

export class Decks {
  private decks: Array<Deck>;

  constructor(questionsPerDeck: number) {
    this.decks = Categories.values().map(
      category => new Deck(category, questionsPerDeck)
    );
  }

  public getNextQuestion(position: number) {
    const category: Category = Categories.in(position);
    const deck: Deck = this.findDeck(category);
    return deck.getNextQuestion();
  }

  private findDeck(category: Category): Deck {
    const found = this.decks.find(deck => deck.category === category);
    if (!found) {
      throw new Error("should not reach here");
    }
    return found;
  }
}

import { Category } from "./category";
import { Deck } from "./deck";

export class QuestionManager {
  private readonly questions: object;

  constructor() {
    this.questions = {
      [Category.Pop]: new Deck(Category.Pop),
      [Category.Science]: new Deck(Category.Science),
      [Category.Sports]: new Deck(Category.Sports),
      [Category.Rock]: new Deck(Category.Rock),
      [Category.History]: new Deck(Category.History),
      [Category.Blues]: new Deck(Category.Blues)
    };
  }

  public getNextQuestion(position: number) {
    const category = this.getCategoryIn(position);
    const deck = this.getDeck(category);
    return deck.getNextQuestion();
  }

  private getCategoryIn(position: number): Category {
    // @ts-ignore
    const categories = Object.values(Category);
    return categories[position % categories.length];
  }

  private getDeck(category: Category) {
    return this.questions[category];
  }
}

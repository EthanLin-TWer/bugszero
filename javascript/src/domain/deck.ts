import { Category } from "./category";

export class Deck {
  private readonly _category: Category;
  private readonly size: number;

  private readonly questions: Array<string>;
  private currentQuestion: number = 0;

  constructor(category: Category, size: number) {
    this._category = category;
    this.size = size;
    // @ts-ignore
    this.questions = Array.from({ length: size }).map(
      (_, i) => `${category} Question ${i}`
    );
  }

  public get category(): string {
    return this._category;
  }

  public getNextQuestion() {
    console.log(`The category is ${this._category}`);
    const question = this.questions[this.currentQuestion];
    this.currentQuestion = (this.currentQuestion + 1) % this.size;
    return question;
  }
}

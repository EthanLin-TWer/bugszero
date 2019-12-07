export class Deck {
  private readonly _category: string;
  private questions: Array<string>;

  constructor(category: string, size: number) {
    this._category = category;
    // @ts-ignore
    this.questions = Array.from({ length: size }).map((_, i) =>
      Deck.createQuestion(category, i)
    );
  }

  private static createQuestion(categoryName: string, i: number) {
    return `${categoryName} Question ${i}`;
  }

  public get category(): string {
    return this._category;
  }

  public getNextQuestion() {
    console.log(`The category is ${this._category}`);
    return this.questions.shift();
  }
}

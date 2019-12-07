export class Deck {
  private readonly _category: string;
  private questions: Array<string>;

  constructor(category: string) {
    this._category = category;
    // @ts-ignore
    this.questions = Array.from({ length: 50 }).map((_, i) =>
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

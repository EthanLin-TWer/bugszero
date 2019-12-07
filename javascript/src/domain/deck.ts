export class Deck {
  private category: string;
  private questions: Array<string>;

  constructor(category: string) {
    this.category = category;
    // @ts-ignore
    this.questions = Array.from({ length: 50 }).map((_, i) =>
      Deck.createQuestion(category, i)
    );
  }

  private static createQuestion(categoryName: string, i: number) {
    return `${categoryName} Question ${i}`;
  }

  public getNextQuestion() {
    console.log(`The category is ${this.category}`);
    return this.questions.shift();
  }
}

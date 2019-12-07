import {Categories, Category, Temp_Categories} from "./category";

export class QuestionManager {
  private questions: object = {
    [Categories.Rock]: [],
    [Categories.Sports]: [],
    [Categories.Pop]: [],
    [Categories.Science]: [],
    [Categories.History]: [],
    [Categories.Blues]: []
  };

  constructor() {
    // @ts-ignore
    const categories = Object.values(Temp_Categories);
    const another = categories.slice(0, categories.length / 2);

    for (let i = 0; i < 50; i++) {
      for (const category of another) {
        this.questions[category].push(createQuestion(category, i));
      }
    }

    function createQuestion(questionType: string, i: number) {
      return `${questionType} Question ${i}`;
    }
  }

  public getNextQuestion(position: number) {
    const category = Category.in(position);
    return this.questions[category].shift();
  }
}

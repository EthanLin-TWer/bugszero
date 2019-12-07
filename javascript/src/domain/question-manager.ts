import { Categories, Category } from "./category";

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
    this.initQuestions();
  }

  private initQuestions() {
    for (let i = 0; i < 50; i++) {
      // @ts-ignore
      for (const category of Object.values(Categories)) {
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

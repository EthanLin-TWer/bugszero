import { Categories } from "../game";

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
      for (const questionType of Object.values(Categories)) {
        this.questions[questionType].push(createQuestion(questionType, i));
      }
    }

    function createQuestion(questionType: string, i: number) {
      return `${questionType} Question ${i}`;
    }
  }

  public getQuestion(category: string) {
    return this.questions[category].shift();
  }
}

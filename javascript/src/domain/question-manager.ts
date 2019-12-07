import { QuestionTypes } from "../game";

export class QuestionManager {
  public questions: object = {
    [QuestionTypes.Rock]: [],
    [QuestionTypes.Sports]: [],
    [QuestionTypes.Pop]: [],
    [QuestionTypes.Science]: [],
    [QuestionTypes.History]: [],
    [QuestionTypes.Blues]: []
  };

  constructor() {
    this.initQuestions();
  }

  private initQuestions() {
    for (let i = 0; i < 50; i++) {
      // @ts-ignore
      for (const questionType of Object.values(QuestionTypes)) {
        this.questions[questionType].push(createQuestion(questionType, i));
      }
    }

    function createQuestion(questionType: string, i: number) {
      return `${questionType} Question ${i}`;
    }
  }

}

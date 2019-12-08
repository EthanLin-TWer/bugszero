import { Simulator } from "../simulator";

export class KnowledgeableSimulator extends Simulator {
  simulateAnswering() {
    // 10% possibility getting it wrong
    return this.getRandom(10) === 7;
  }
}

import { GameSimulator } from "../gameSimulator";

export class KnowledgeableSimulator extends GameSimulator {
  simulateAnswering() {
    // 10% possibility getting it wrong
    return this.getRandom(10) === 7;
  }
}

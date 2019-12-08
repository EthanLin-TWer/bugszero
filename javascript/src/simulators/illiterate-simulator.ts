import { GameSimulator } from "../gameSimulator";

export class IlliterateSimulator extends GameSimulator {
  simulateAnswering() {
    // 99% possibility getting it wrong
    return this.getRandom(100) < 98;
  }
}

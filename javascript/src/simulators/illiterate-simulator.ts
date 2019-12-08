import { Simulator } from "../simulator";

export class IlliterateSimulator extends Simulator {
  simulateAnswering() {
    // 99% possibility getting it wrong
    return this.getRandom(100) < 98;
  }
}

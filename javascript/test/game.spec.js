const _ = require("lodash");

const { gameRunner } = require("../src/game-runner");
const simulator = require("./rands");
const expected = require("./expected");

describe("The game", function() {
  it("should work ;-)", function() {
    const loggedLines = [];
    const oldLog = console.log;
    console.log = function(arg) {
      loggedLines.push(arg);
    };

    _.range(15).forEach(() => {
      gameRunner(simulator, new simulator.Simulator());
    });

    console.log = oldLog;

    console.log(JSON.stringify(loggedLines, "utf-8", 0));
    expect(loggedLines).toEqual(expected);
  });
});

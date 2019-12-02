const _ = require("lodash");

const { gameRunner } = require("../src/game-runner");
const { getRandom } = require("./rands");
const expected = require("./expected");

describe("The game", function() {
  it("should work ;-)", function() {
    const loggedLines = [];
    const oldLog = console.log;
    console.log = function(arg) {
      loggedLines.push(arg);
    };

    _.range(15).forEach(() => {
      gameRunner(getRandom);
    });

    console.log = oldLog;

    expect(loggedLines).toEqual(expected);
  });
});

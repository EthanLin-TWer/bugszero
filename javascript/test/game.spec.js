const _ = require("lodash");

const { Game } = require("../src/game");
const { Simulator } = require("../src/simulator");
const expected = require("./expected");

describe("The game", function() {
  it("should work ;-)", function() {
    const loggedLines = [];
    const oldLog = console.log;
    console.log = function(arg) {
      loggedLines.push(arg);
    };

    _.range(15).forEach(() => {
      const game = new Game();

      game.add("Chet");
      game.add("Pat");
      game.add("Sue");

      game.start(new Simulator());
    });

    console.log = oldLog;

    console.log(JSON.stringify(loggedLines, "utf-8", 0));
    expect(loggedLines).toEqual(expected);
  });
});

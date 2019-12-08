const _ = require("lodash");

const { Game } = require("../src/game");
const { Simulator } = require("../src/simulator");
const expected = require("./expected");

describe("The game", function() {
  let vanillaConsoleLog;
  let result;
  beforeEach(() => {
    result = [];
    vanillaConsoleLog = console.log;
    console.log = function(arg) {
      result.push(arg);
    };
  });

  afterEach(() => {
    console.log = vanillaConsoleLog;
    console.log(JSON.stringify(result, "utf-8", 0));
  });

  it("should work ;-)", function() {
    _.range(15).forEach(() => {
      const game = new Game();

      game.add("Chet");
      game.add("Pat");
      game.add("Sue");

      game.start(new Simulator());
    });

    expect(result).toEqual(expected);
  });

  it("should never run out of deck questions", function() {
    const game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    game.start(new Simulator());
  });
});

var assert = require("assert")
var gol = require("../src/js/game_of_life");

// fail: [Function: fail],
// ok: [Circular],
// equal: [Function: equal],
// notEqual: [Function: notEqual],
// deepEqual: [Function: deepEqual],
// notDeepEqual: [Function: notDeepEqual],
// strictEqual: [Function: strictEqual],
// notStrictEqual: [Function: notStrictEqual],
// throws: [Function],
// doesNotThrow: [Function],
// ifError: [Function] }

describe('isAlive', function() {
  it('returns true if the cell is in the list of living cells', function () {
    var world = [[1,2],[3,4]]
    assert.ok(gol.isAlive(world, [1,2])) // matches in 2 positions
    assert.ok(gol.isAlive(world, [3,4]))
    assert.ok(!gol.isAlive(world, [1,3])) // mismatch on x
    assert.ok(!gol.isAlive(world, [0,2])) // mismatch on y
    assert.ok(!gol.isAlive(world, [0,0])) // mismatch on both
  });
});

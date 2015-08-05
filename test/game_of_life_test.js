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

describe('neighboursOf', function() {
  it('returns the 8 cells around the cell', function() {
    var neighbours = [
      [-1,-1], [0,-1], [1,-1],
      [-1, 0],         [1, 0],
      [-1, 1], [0, 1], [1, 1]
    ]
    assert.deepEqual(neighbours, gol.neighboursOf([0, 0]));
  });
});

describe('numNeigbours', function() {
  it('returns the number of neighbours that are alive', function() {
    assert.equal(0, gol.numNeighbours([                  ], [1,2]));
    assert.equal(0, gol.numNeighbours([[0,0]             ], [1,2]));
    assert.equal(1, gol.numNeighbours([[1,2],[2,2]       ], [1,2]));
    assert.equal(2, gol.numNeighbours([[1,2],[1,3], [2,1]], [1,2]));
  });
});

describe('isAliveTomorrow', function() {
  it('will be alive if it is dead and has 3 neighbours', function() {
    assert.ok( gol.isAliveTomorrow([         [0, 0], [1, 0], [2, 0]], [1, 1]))
    assert.ok( gol.isAliveTomorrow([[1, -1], [0, 0], [1, 0], [2, 0]], [1, 1]))
    assert.ok(!gol.isAliveTomorrow([                 [1, 0], [2, 0]], [1, 1]))
    assert.ok(!gol.isAliveTomorrow([[0,  1], [0, 0], [1, 0], [2, 0]], [1, 1]))
  });
  it('will be alive if it is alive and has 2 or 3 neighbours', function() {
    assert.ok( gol.isAliveTomorrow([[1, 1],                  [1, 0], [2, 0]], [1, 1]))
    assert.ok( gol.isAliveTomorrow([[1, 1],          [0, 0], [1, 0], [2, 0]], [1, 1]))
    assert.ok( gol.isAliveTomorrow([[1, 1], [1, -1], [0, 0], [1, 0], [2, 0]], [1, 1]))

    assert.ok(!gol.isAliveTomorrow([[1, 1],                          [2, 0]], [1, 1]))
    assert.ok(!gol.isAliveTomorrow([[1, 1], [0,  1], [0, 0], [1, 0], [2, 0]], [1, 1]))
  });
});

describe('hasCell', function() {
  it('returns true if the cell is in the collection', function() {
    assert.ok( gol.hasCell([[0,0], [1,1]], [0,0]));
    assert.ok( gol.hasCell([[0,0], [1,1]], [1,1]));
    assert.ok(!gol.hasCell([[0,0], [1,1]], [2,1]));
    assert.ok(!gol.hasCell([[0,0], [1,1]], [1,2]));
    assert.ok(!gol.hasCell([[0,0], [1,1]], [2,2]));
  });
});

describe('potentiallyLiving', function() {
  it('chooses all the living cells, and all the ones around them', function() {
    assert.deepEqual([
        [0, 0], [0, 1],          // existing cells

        [-1,-1], [0,-1], [1,-1], // additions
        [-1, 0],         [1, 0],
        [-1, 1],         [1, 1],
        [-1, 2], [0, 2], [1, 2]
      ],
      gol.potentiallyLiving([[0, 0], [0, 1]])
    )
  });
});


describe('tomorrow', function() {
  it('returns the cells that will be alive tomorrow', function() {
    blinker1 = [[1, 1], [0, 1], [2, 1]];
    blinker2 = [[1, 1], [1, 0], [1, 2]];
    assert.deepEqual(blinker2, gol.tomorrow(blinker1));
    assert.deepEqual(blinker1, gol.tomorrow(blinker2));
  });
});

"use strict"

var _   = require("./underscore-min");
var gol = {};

gol.isAlive = function(cells, target) {
  var expectedX = target[0];
  var expectedY = target[1];

  var cell = _.find(cells, function(current) {
    var currentX = current[0];
    var currentY = current[1];
    return currentX == expectedX && currentY == expectedY;
  });
  return cell;
}

gol.neighboursOf = function(cell) {
  var x = cell[0]
  var y = cell[1]
  var neighbours = [
    [x-1, y-1], [x, y-1], [x+1, y-1],
    [x-1, y  ],           [x+1, y  ],
    [x-1, y+1], [x, y+1], [x+1, y+1],
  ];
  return neighbours;
}

gol.numNeighbours = function(cells, cell) {
  var neighbours       = gol.neighboursOf(cell);
  var livingNeighbours = _.select(neighbours, function(neighbour) {
    return gol.isAlive(cells, neighbour);
  });
  return livingNeighbours.length;
}

gol.isAliveTomorrow = function(cells, cell) {
  var n = gol.numNeighbours(cells, cell);
  return n == 3 || (n == 2 && gol.isAlive(cells, cell));
}

// function tomorrow(cells) {
//   var potentials = potentiallyLiving(cells);
//   var livingNeighboursCount = _.select(potentials, function(potential) {
//     return isAliveTomorrow(cells, potential);
//   });
//   return livingNeighboursCount;
// }

gol.potentiallyLiving = function(cells) {
  var potentiallyLiving = [];
  cells.forEach(function(cell) { potentiallyLiving.push(cell) })
  cells.forEach(function(cell) {
    gol.neighboursOf(cell).forEach(function(neighbour) {
      if(!gol.hasCell(potentiallyLiving, neighbour))
        potentiallyLiving.push(neighbour)
    });
  });
  return potentiallyLiving;
}

gol.hasCell = function(cells, cell) {
  return !!_.find(cells, function(potential) {
    return potential[0] == cell[0] && potential[1] == cell[1];
  });
}

// // var cells = [[1, 0], [1, 1], [1, 2]];
// // console.dir(cells);
// // console.dir(tomorrow(cells));
//     // console.log({
//     //   currentX: currentX,
//     //   currentY: currentY,
//     //   expectedX: expectedX,
//     //   expectedY: expectedY,
//     // });

module.exports = gol

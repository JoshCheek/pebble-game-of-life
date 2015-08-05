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

  // function isAliveTomorrow(cells, cell) {
  //   var n = numNeighbours(cells, cell);
  //   return n == 3 || (n == 2 && isAlive(cells, cell));
  // }



// console.log(numNeighbours([[1,2],[1,3], [2,1]], [1,2]));
// console.log(isAliveTomorrow([[1,2],[1,3], [2,1]], [1,2]));
// console.log(isAliveTomorrow([[1,2],[3,4]], [1,2]));

// function tomorrow(cells) {
//   var potentials = potentially_living(cells);
//   var livingNeighboursCount = _.select(potentials, function(potential) {
//     return isAliveTomorrow(cells, potential);
//   });
//   return livingNeighboursCount;
// }

// function potentially_living(cells) {
//   var potentiallyLiving = [];
//   cells.forEach(function(cell) {
//     potentiallyLiving.push(cell);
//     neighboursOf(cells, cell).forEach(function(neighbour) { potentiallyLiving.push(cell); });
//   });
//   return potentiallyLiving;
// }

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

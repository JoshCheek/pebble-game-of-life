"use strict"

var _ = require("./underscore-min");

var gol = {
  isAlive: function(cells, target) {
    var expectedX = target[0];
    var expectedY = target[1];

    var cell = _.find(cells, function(current) {
      var currentX = current[0];
      var currentY = current[1];
      return currentX == expectedX && currentY == expectedY;
    });
    return cell;
  },
  neighboursOf: function(cell) {
    var x = cell[0]
    var y = cell[1]
    var neighbours = [
      [x-1, y-1], [x, y-1], [x+1, y-1],
      [x-1, y  ],           [x+1, y  ],
      [x-1, y+1], [x, y+1], [x+1, y+1],
    ];
    return neighbours;
  }

  // // console.log(num_neighbours([], [1,2]));
// // console.log(isAliveTomorrow([[1,2],[1,3], [2,1]], [1,2]));
// // console.log(isAliveTomorrow([[1,2],[3,4]], [1,2]));
  // function isAliveTomorrow(cells, cell) {
  //   var n = num_neighbours(cells, cell);
  //   return n == 3 || (n == 2 && isAlive(cells, cell));
  // }
}

// function num_neighbours(cells, cell) {
//   var neighbours = neighbours_of(cells, cell);
//   var livingNeighboursCount = _.select(neighbours, function(neighbour) {
//     return isAlive(cells, neighbour);
//   });
//   return livingNeighboursCount.length;
// }


// console.log(num_neighbours([[1,2],[1,3], [2,1]], [1,2]));
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
//     neighbours_of(cells, cell).forEach(function(neighbour) { potentiallyLiving.push(cell); });
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

/**
 * Author: Laura Whellans
 */

//  [4, 0] | [4, 1] | [4, 2] | [4, 3] | [4, 4]
//
//  [3, 0] | [3, 1] | [3, 2] | [3, 3] | [3, 4]
//
//  [2, 0] | [2, 1] | [2, 2] | [2, 3] | [2, 4]
//
//  [1, 0] | [1, 1] | [1, 2] | [1, 3] | [1, 4]
//
//  [0, 0] | [0, 1] | [0, 2] | [0, 3] | [0, 4]

//        N
//        ↑
//        |
//  W <---O---> E
//        |
//        ↓
//        S

/**
 * The Grid Constraints.
 * @type {{width: number, height: number}}
 */
var grid = {
    width: 4,
    height: 4
};

/**
 * The robot object to be moved within the grid.
 * @type {{facing: string, x: number, y: number, move: Function}}
 */
var robot = {
    facing: "NORTH",
    x: 0,
    y: 0,
    move: function() {
        move[this.facing]();
    }
};

/**
 * Checks the grid boundaries, and moves the robot by 1 in the current facing direction.
 * @type {{
 * NORTH: (function(this:{facing: string, x: number, y: number, move: Function})),
 * SOUTH: (function(this:{facing: string, x: number, y: number, move: Function})),
 * EAST: (function(this:{facing: string, x: number, y: number, move: Function})),
 * WEST: (function(this:{facing: string, x: number, y: number, move: Function}))}}
 */
var move = {
    NORTH: function () { if (this.y < grid.height) this.y++;}.bind(robot),
    SOUTH: function () { if (this.y > 0) this.y--; }.bind(robot),
    EAST: function () { if (this.x < grid.width) this.x++; }.bind(robot),
    WEST: function () { if (this.x > 0) this.x--; }.bind(robot)
};
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
 * Object containing the facing values, the left and right values for rotation, and the move function
 * for each facing direction.
 *
 * @type {{
 * NORTH: {name: string, left: string, right: string, move: Function},
 * EAST: {name: string, left: string, right: string, move: Function},
 * SOUTH: {name: string, left: string, right: string, move: Function},
 * WEST: {name: string, left: string, right: string, move: Function}}}
 */
var facing = {
    NORTH: { name: "NORTH", left: "WEST", right: "EAST", move: function () { if (robot.y < grid.height) robot.y++;} },
    EAST: { name: "EAST", left: "NORTH", right: "SOUTH", move: function () { if (robot.x < grid.width) robot.x++; } },
    SOUTH: { name: "SOUTH", left: "EAST", right: "WEST", move: function () { if (robot.y > 0) robot.y--; } },
    WEST: { name: "WEST", left: "SOUTH", right: "NORTH", move: function () { if (robot.x > 0) robot.x--; } }
};

/**
 * The robot object to be moved within the grid.
 * @type {{
 * facing: string, x: number, y: number, move: Function}}
 */
var robot = {
    facing: facing.NORTH,
    x: 0,
    y: 0,
    move: function() {
        this.facing.move();
    },
    left: function() {
        this.facing = facing[this.facing.left];
    },
    right: function() {
        this.facing = facing[this.facing.right];
    }
};

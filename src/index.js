/**
 * Author: Laura Whellans
 */

//  [0, 4] | [1, 4] | [2, 4] | [3, 4] | [4, 4]
//
//  [0, 3] | [1, 3] | [2, 3] | [3, 3] | [4, 3]
//
//  [0, 2] | [1, 2] | [2, 2] | [3, 2] | [4, 2]
//
//  [0, 1] | [1, 1] | [2, 1] | [3, 1] | [4, 1]
//
//  [0, 0] | [1, 0] | [2, 0] | [3, 0] | [4, 0]

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

placeRobot();

function placeRobot() {
    var robot = new Robot(4, 4, "WEST")
}
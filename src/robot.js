/**
 * Author: Laura Whellans
 *
 * Robot object: Can be placed on to a table, and rotated, moved and reported on.
 */

/**
 * Constructor for robot object, creating an unplaced robot.
 * @constructor
 */
function Robot() {
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
        NORTH: { name: "NORTH", left: "WEST", right: "EAST", move: function () { if (this.y < grid.height) this.y++;}.bind(this) },
        EAST: { name: "EAST", left: "NORTH", right: "SOUTH", move: function () { if (this.x < grid.width) this.x++; }.bind(this) },
        SOUTH: { name: "SOUTH", left: "EAST", right: "WEST", move: function () { if (this.y > 0) this.y--; }.bind(this) },
        WEST: { name: "WEST", left: "SOUTH", right: "NORTH", move: function () { if (this.x > 0) this.x--; }.bind(this) }
    };

    this.facing = {};
    this.x;
    this.y;

    /**
     * Moves the robot in the facing direction by 1
     */
    this.move = function () {
        console.log("move");
        this.facing.move();
    };

    /**
     * Rotates the robot left
     */
    this.left = function () {
        console.log("left");

        this.facing = facing[this.facing.left];
    };

    /**
     * Rotates the robot right
     */
    this.right = function () {
        console.log("right");
        this.facing = facing[this.facing.right];
    };

    /**
     * Places the robot on the table.
     * @param x - x coordinate to place the rpbot
     * @param y - y coordinate to place the robot
     * @param f - the facing direction of the robot
     */
    this.place = function (x, y, f) {
        console.log("placed");
        this.facing = facing[f];
        this.x = x;
        this.y = y;
    };

    /**
     * Returns a formatted string reporting on the current position of the robot
     * @returns {string}
     */
    this.report = function () {
        console.log("report");
        return "Robot Position: " +
            "X: " + this.x +
            ", Y: " + this.y +
            ", Facing: " + this.facing.name;
    };

    /**
     * Checks if the robot has been placed yet.
     * @returns {boolean}
     */
    this.isPlaced = function () {
        return this.x != null && this.y != null && !!this.facing;
    }

}
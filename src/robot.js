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

    this.move = function () {
        this.facing.move();
    };

    this.left = function () {
        this.facing = facing[this.facing.left];
    };

    this.right = function () {
        this.facing = facing[this.facing.right];
    };

    this.place = function (x, y, f) {
        this.facing = facing[f];
        this.x = x;
        this.y = y;
    };

    this.report = function () {
        return "Robot Position: " +
            "X: " + this.x +
            ", Y: " + this.y +
            ", Facing: " + this.facing.name;
    };

    this.isPlaced = function () {
        return !!this.x && !!this.y && !!this.facing;
    }

}
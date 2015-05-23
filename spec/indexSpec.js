/**
 * Author: Laura Whellans
 */

describe("Move", function() {
    describe("East", function() {

        beforeEach(function() {
            robot.facing = "EAST";
            robot.x = 0;
            robot.y = 0;
        });

        it("should increment x by 1", function() {
            robot.move();
            expect(robot.x).toEqual(1);
        });

        it("should not increment past the grid width of " + grid.width, function() {
            // expect robot.x == 0
            robot.move(); // expect robot.x == 1
            robot.move(); // expect robot.x == 2
            robot.move(); // expect robot.x == 3
            robot.move(); // expect robot.x == 4
            robot.move(); // expect robot.x to not increase after 4
            robot.move(); // expect robot.x to not increase after 4
            expect(robot.x).toEqual(grid.width);
        });


    });

    describe("West", function() {

        beforeEach(function() {
            robot.facing = "WEST";
            robot.x = 4;
            robot.y = 4;
        });

        it("should decrement x by 1", function() {
            robot.move();
            expect(robot.x).toEqual(3);
        });

        it("should not decrement below 0", function() {
            // expect robot.x == 4
            robot.move(); // expect robot.x == 3
            robot.move(); // expect robot.x == 2
            robot.move(); // expect robot.x == 1
            robot.move(); // expect robot.x == 0
            robot.move(); // expect robot.x to not decrease less than 0
            robot.move(); // expect robot.x to not decrease less than 0
            expect(robot.x).toEqual(0);
        });
    });

    describe("North", function() {

        beforeEach(function() {
            robot.facing = "NORTH";
            robot.x = 0;
            robot.y = 0;
        });

        it("should increment y by 1", function() {
            robot.move();
            expect(robot.y).toEqual(1);
        });

        it("should not increment past the grid width of " + grid.height, function() {
            // expect robot.y == 0
            robot.move(); // expect robot.y == 1
            robot.move(); // expect robot.y == 2
            robot.move(); // expect robot.y == 3
            robot.move(); // expect robot.y == 4
            robot.move(); // expect robot.y to not increase after 4
            robot.move(); // expect robot.y to not increase after 4
            expect(robot.y).toEqual(grid.height);
        });
    });


    describe("South", function() {

        beforeEach(function() {
            robot.facing = "SOUTH";
            robot.x = 4;
            robot.y = 4;
        });

        it("should decrement y by 1", function() {
            robot.move();
            expect(robot.y).toEqual(3);
        });

        it("should not decrement below 0", function() {
            // expect robot.y == 4
            robot.move(); // expect robot.y == 3
            robot.move(); // expect robot.y == 2
            robot.move(); // expect robot.y == 1
            robot.move(); // expect robot.y == 0
            robot.move(); // expect robot.y to not decrease less than 0
            robot.move(); // expect robot.y to not decrease less than 0
            expect(robot.y).toEqual(0);
        });
    });
});

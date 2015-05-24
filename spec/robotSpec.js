/**
 * Author: Laura Whellans
 */

describe("Test Example Data", function() {

    function testExampleData(testRobot, expectedX, expectedY, expectedFacing) {

        it("robot.x should be " + expectedX, function() {
            expect(testRobot.x).toBe(expectedX);
        });

        it("robot.y should be " + expectedY, function() {
            expect(testRobot.y).toBe(expectedY);

        });

        it("robot.facing should be "+ expectedFacing, function() {
            expect(testRobot.facing.name).toBe(expectedFacing);
        });

        it("should create report with final position details", function() {
            var expectedReport = "Final Robot Position: " +
                "X: " + expectedX +
                ", Y: " + expectedY +
                ", Facing: " + expectedFacing;

            expect(testRobot.report()).toBe(expectedReport);
        });
    }

    describe("Example Input A.", function() {
        var testRobot = new Robot(0, 0, "NORTH");
        testRobot.move();
        testExampleData(testRobot, 0, 1, "NORTH");
    });

    describe("Example Input B.", function() {
        var testRobot = new Robot(0, 0, "NORTH");
        testRobot.left();
        testExampleData(testRobot, 0, 0, "WEST");
    });

    describe("Example Input C.", function() {
        var testRobot = new Robot(1, 2, "EAST");

        testRobot.move();
        testRobot.move();
        testRobot.left();
        testRobot.move();
        testExampleData(testRobot, 3, 3, "NORTH");
    });
});

function rotateLeft(testRobot, expectedFacing) {
    it("should rotate left from " + testRobot.facing.name + " to " + expectedFacing, function() {
        testRobot.left();
        expect(testRobot.facing.name).toBe(expectedFacing);
    });
}

function rotateRight(testRobot, expectedFacing) {
    it("should rotate Right from " + testRobot.facing.name + " to " + expectedFacing, function() {
        testRobot.right();
        expect(testRobot.facing.name).toBe(expectedFacing);
    });
}
describe("Rotate", function() {
    describe("Left", function() {
        rotateLeft(new Robot(0, 0, "NORTH"), "WEST");
        rotateLeft(new Robot(0, 0, "WEST"), "SOUTH");
        rotateLeft(new Robot(0, 0, "SOUTH"), "EAST");
        rotateLeft(new Robot(0, 0, "EAST"), "NORTH");
    });

    describe("Right", function() {
        rotateRight(new Robot(0, 0, "NORTH"), "EAST");
        rotateRight(new Robot(0, 0, "EAST"), "SOUTH");
        rotateRight(new Robot(0, 0, "SOUTH"), "WEST");
        rotateRight(new Robot(0, 0, "WEST"), "NORTH");
    });
});

describe("Move", function() {
    describe("East", function() {

        var testRobot = Object();

        beforeEach(function() {
            testRobot = new Robot(0, 0, "EAST")
        });

        it("should increment x by 1", function() {
            testRobot.move();
            expect(testRobot.x).toEqual(1);
        });

        it("should not increment past the grid width of " + grid.width, function() {
            // expect robot.x == 0
            testRobot.move(); // expect robot.x == 1
            testRobot.move(); // expect robot.x == 2
            testRobot.move(); // expect robot.x == 3
            testRobot.move(); // expect robot.x == 4
            testRobot.move(); // expect robot.x to not increase after 4
            testRobot.move(); // expect robot.x to not increase after 4
            expect(testRobot.x).toEqual(grid.width);
        });
    });

    describe("West", function() {

        var testRobot = Object();

        beforeEach(function() {
            testRobot = new Robot(4, 4, "WEST")
        });

        it("should decrement x by 1", function() {
            testRobot.move();
            expect(testRobot.x).toEqual(3);
        });

        it("should not decrement below 0", function() {
            // expect robot.x == 4
            testRobot.move(); // expect robot.x == 3
            testRobot.move(); // expect robot.x == 2
            testRobot.move(); // expect robot.x == 1
            testRobot.move(); // expect robot.x == 0
            testRobot.move(); // expect robot.x to not decrease less than 0
            testRobot.move(); // expect robot.x to not decrease less than 0
            expect(testRobot.x).toEqual(0);
        });
    });

    describe("North", function() {

        var testRobot = Object();

        beforeEach(function() {
            testRobot = new Robot(0, 0, "NORTH")
        });

        it("should increment y by 1", function() {
            testRobot.move();
            expect(testRobot.y).toEqual(1);
        });

        it("should not increment past the grid width of " + grid.height, function() {
            // expect robot.y == 0
            testRobot.move(); // expect robot.y == 1
            testRobot.move(); // expect robot.y == 2
            testRobot.move(); // expect robot.y == 3
            testRobot.move(); // expect robot.y == 4
            testRobot.move(); // expect robot.y to not increase after 4
            testRobot.move(); // expect robot.y to not increase after 4
            expect(testRobot.y).toEqual(grid.height);
        });
    });

    describe("South", function() {

        var testRobot = Object();

        beforeEach(function() {
            testRobot = new Robot(4, 4, "SOUTH")
        });

        it("should decrement y by 1", function() {
            testRobot.move();
            expect(testRobot.y).toEqual(3);
        });

        it("should not decrement below 0", function() {
            // expect robot.y == 4
            testRobot.move(); // expect robot.y == 3
            testRobot.move(); // expect robot.y == 2
            testRobot.move(); // expect robot.y == 1
            testRobot.move(); // expect robot.y == 0
            testRobot.move(); // expect robot.y to not decrease less than 0
            testRobot.move(); // expect robot.y to not decrease less than 0
            expect(testRobot.y).toEqual(0);
        });
    });
});

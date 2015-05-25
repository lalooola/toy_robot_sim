/**
 * Author: Laura Whellans
 */

describe("Run Instruction", function() {

    beforeEach(function() {
        instructionError = "";
    });

    it("should create 'EMPTY_INSTRUCTION_ERROR' error if instruction is null.", function() {
        runInstruction();
        expect(instructionError).toEqual(EMPTY_INSTRUCTION_ERROR);
    });

    it("should create 'EMPTY_INSTRUCTION_ERROR' error if instruction is an empty string.", function() {
        runInstruction("");
        expect(instructionError).toEqual(EMPTY_INSTRUCTION_ERROR);
    });

    it("should create 'EMPTY_INSTRUCTION_ERROR' error if instruction is a string with spaces.", function() {
        runInstruction("   ");
        expect(instructionError).toEqual(EMPTY_INSTRUCTION_ERROR);
    });

    it("should create 'PLACE_INSTRUCTION_EXPECTED_ERROR' error if robot has not been placed and instruction is not a PLACE instruction", function() {
        runInstruction("something");
        expect(instructionError).toEqual(PLACE_INSTRUCTION_EXPECTED_ERROR);
    });

    describe("Place Robot with valid Place Command", function () {

        it("should place the robot if valid place command", function() {
            runInstruction("place 1, 3, north");
            expect(placedRobot.isPlaced()).toEqual(true);
        });

        it("should place the robot.x at 1", function() {
            runInstruction("place 1, 3, north");
            expect(placedRobot.x).toEqual(1);
        });

        it("should place the robot.x at 1", function() {
            runInstruction("place 1, 3, north");
            expect(placedRobot.y).toEqual(3);
        });

        it("should place the robot.x at 1", function() {
            runInstruction("place 1, 3, north");
            expect(placedRobot.facing.name).toEqual("NORTH");
        });
    });

    describe("Move Robot", function () {

        it("should move the robot along X axis", function() {
            runInstruction("place 0, 0, north");
            runInstruction("move");
            expect(placedRobot.y).toEqual(1);
        });

        it("should move the robot along X axis", function() {
            runInstruction("place 0, 0, east");
            runInstruction("move");
            expect(placedRobot.x).toEqual(1);
        });

    });

    describe("Rotate", function () {
        describe("Left", function () {

            it("should rotate from NORTH to WEST", function() {
                runInstruction("place 0, 0, north");
                runInstruction("left");
                expect(placedRobot.facing.name).toEqual("WEST");
            });

            it("should rotate from WEST to SOUTH", function() {
                runInstruction("place 0, 0, west");
                runInstruction("left");
                expect(placedRobot.facing.name).toEqual("SOUTH");
            });

            it("should rotate from SOUTH to EAST", function() {
                runInstruction("place 0, 0, south");
                runInstruction("left");
                expect(placedRobot.facing.name).toEqual("EAST");
            });

            it("should rotate from EAST to NORTH", function() {
                runInstruction("place 0, 0, east");
                runInstruction("left");
                expect(placedRobot.facing.name).toEqual("NORTH");
            });

        });
        describe("Right", function () {

            it("should rotate from NORTH to EAST", function() {
                runInstruction("place 0, 0, north");
                runInstruction("right");
                expect(placedRobot.facing.name).toEqual("EAST");
            });

            it("should rotate from EAST to SOUTH", function() {
                runInstruction("place 0, 0, east");
                runInstruction("right");
                expect(placedRobot.facing.name).toEqual("SOUTH");
            });

            it("should rotate from SOUTH to WEST", function() {
                runInstruction("place 0, 0, south");
                runInstruction("right");
                expect(placedRobot.facing.name).toEqual("WEST");
            });

            it("should rotate from WEST to NORTH", function() {
                runInstruction("place 0, 0, west");
                runInstruction("right");
                expect(placedRobot.facing.name).toEqual("NORTH");
            });
        });
    });
});

describe("Is Place Instruction.", function() {

    it("should return false if instruction null", function() {
        expect(isPlaceInstruction()).toEqual(false);
    });

    it("should return false if instruction is empty string", function() {
        expect(isPlaceInstruction("")).toEqual(false);
    });

    it("should return false if instruction is empty string with spaces", function() {
        expect(isPlaceInstruction("")).toEqual(false);
    });

    it("should return false if instruction is not a PLACE instruction", function() {
        expect(isPlaceInstruction("something")).toEqual(false);
    });

    it("should return false if instruction contains the PLACE string not at the start of the instruction", function() {
        expect(isPlaceInstruction("something PLACE")).toEqual(false);
    });

    it("should return true if instruction is a valid PLACE instruction", function() {
        expect(isPlaceInstruction("PLACE")).toEqual(true);
    });

    it("should return true if instruction is a valid PLACE instruction in lowercase", function() {
        expect(isPlaceInstruction("place")).toEqual(true);
    });

    it("should return true if instruction is a valid PLACE instruction with other values after it", function() {
        expect(isPlaceInstruction("PLACE 3, 5, NORTH")).toEqual(true);
    });

});

describe("Extract Place Instruction.", function() {


    beforeEach(function() {
        instructionError = "";
    });

    it("should create 'BAD_INSTRUCTION_ERROR' error if instruction is not a PLACE command.", function() {
        extractPlaceInstruction("something");
        expect(instructionError).toEqual(BAD_INSTRUCTION_ERROR);
    });

    it("should create 'INVALID_X' error if instructions X arg is invalid", function() {
        extractPlaceInstruction("place 10j, 3, north");
        expect(instructionError).toEqual(INVALID_X);
    });

    it("should create 'INVALID_Y' error if instructions Y arg is invalid", function() {
        extractPlaceInstruction("place 1, 3dd, north");
        expect(instructionError).toEqual(INVALID_Y);
    });

    it("should create 'INVALID_FACING' error if instructions facing arg is invalid", function() {
        extractPlaceInstruction("place 1, 1, something");
        expect(instructionError).toEqual(INVALID_FACING);
    });

    it("should return placing object ifvalid input", function() {
        var expectedPlacingObj = {
            x: 0,
            y: 2,
            facing: "NORTH"
        };
        expect(extractPlaceInstruction("place 0, 2, north")).toEqual(expectedPlacingObj);
    });

});

describe("is Valid X.", function() {

    it("should return false if x is null", function() {
        expect(isValidX()).toEqual(false);
    });

    it("should return false if x is empty string", function() {
        expect(isValidX("")).toEqual(false);
    });

    it("should return false if x is a string of spaces", function() {
        expect(isValidX("   ")).toEqual(false);
    });

    it("should return false if x is not a number", function() {
        expect(isValidX("not a number")).toEqual(false);
    });

    it("should return false if x is less then 0", function() {
        expect(isValidX("-1")).toEqual(false);
    });

    it("should return false if x is greater then the grid width", function() {
        expect(isValidX(grid.width + 5)).toEqual(false);
    });

    it("should return true if x is equal to 0", function() {
        expect(isValidX(0)).toEqual(true);
    });

    it("should return true if x is equal to the grid width", function() {
        expect(isValidX(grid.width)).toEqual(true);
    });

    it("should return true if x is between 0 and the grid.width", function() {
        expect(isValidX(3)).toEqual(true);
    });
});


describe("is Valid Y.", function() {

    it("should return false if y is null", function() {
        expect(isValidY()).toEqual(false);
    });

    it("should return false if y is empty string", function() {
        expect(isValidY("")).toEqual(false);
    });

    it("should return false if y is a string of spaces", function() {
        expect(isValidY("   ")).toEqual(false);
    });

    it("should return false if y is not a number", function() {
        expect(isValidY("not a number")).toEqual(false);
    });

    it("should return false if y is less then 0", function() {
        expect(isValidY("-1")).toEqual(false);
    });

    it("should return false if y is greater then the grid height", function() {
        expect(isValidY(grid.width + 5)).toEqual(false);
    });

    it("should return true if y is equal to 0", function() {
        expect(isValidY(0)).toEqual(true);
    });

    it("should return true if y is equal to the grid height", function() {
        expect(isValidY(grid.width)).toEqual(true);
    });

    it("should return true if y is between 0 and the grid.height", function() {
        expect(isValidY(3)).toEqual(true);
    });
});



describe("is Valid facing.", function() {

    it("should return false if facing is null", function() {
        expect(isValidFacing()).toEqual(false);
    });

    it("should return false if facing is empty string", function() {
        expect(isValidFacing("")).toEqual(false);
    });

    it("should return false if facing is a string of spaces", function() {
        expect(isValidFacing("   ")).toEqual(false);
    });

    it("should return false if facing is an invalid direction", function() {
        expect(isValidFacing("something")).toEqual(false);
    });

    it("should return true if facing is NORTH", function() {
        expect(isValidFacing("NORTH")).toEqual(true);
    });

    it("should return true if facing is north", function() {
        expect(isValidFacing("north")).toEqual(true);
    });

    it("should return true if facing is SOUTH", function() {
        expect(isValidFacing("SOUTH")).toEqual(true);
    });

    it("should return true if facing is south", function() {
        expect(isValidFacing("south")).toEqual(true);
    });

    it("should return true if facing is EAST", function() {
        expect(isValidFacing("EAST")).toEqual(true);
    });

    it("should return true if facing is east", function() {
        expect(isValidFacing("east")).toEqual(true);
    });

    it("should return true if facing is WEST", function() {
        expect(isValidFacing("WEST")).toEqual(true);
    });

    it("should return true if facing is west", function() {
        expect(isValidFacing("west")).toEqual(true);
    });

});

describe("is Valid instruction.", function() {

    it("should return false if instruction is null", function () {
        expect(isValidInstruction()).toEqual(false);
    });

    it("should return false if instruction is empty string", function () {
        expect(isValidInstruction("")).toEqual(false);
    });

    it("should return false if instruction is a string of spaces", function () {
        expect(isValidInstruction("   ")).toEqual(false);
    });

    it("should return false if instruction has more then one word", function () {
        expect(isValidInstruction("move dsfd")).toEqual(false);
    });

    it("should return true if instruction is place", function () {
        expect(isValidInstruction("place")).toEqual(true);
    });

    it("should return true if instruction is move", function () {
        expect(isValidInstruction("move")).toEqual(true);
    });

    it("should return true if instruction is left", function () {
        expect(isValidInstruction("left")).toEqual(true);
    });

    it("should return true if instruction is right", function () {
        expect(isValidInstruction("right")).toEqual(true);
    });

    it("should return true if instruction is report", function () {
        expect(isValidInstruction("report")).toEqual(true);
    });
});

describe("is empty string.", function() {

    it("should return false if string is null", function () {
        expect(isEmptyString()).toEqual(true);
    });

    it("should return false if string is empty string", function () {
        expect(isEmptyString("")).toEqual(true);
    });

    it("should return false if string is a string of spaces", function () {
        expect(isEmptyString("   ")).toEqual(true);
    });
});


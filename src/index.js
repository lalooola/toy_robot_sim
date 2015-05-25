/**
 * Author: Laura Whellans
 *
 * This class handles the user input and validation for controlling the Robot.
 */

/**
 * The Grid Constraints.
 * @type {{width: number, height: number}}
 */
var grid = {
    width: 4,
    height: 4
};

/**
 * Valid facing directions for the robot
 * @type {{NORTH: string, SOUTH: string, EAST: string, WEST: string}}
 */
var directions = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}

/**
 * Valid instructions for the robot
 * @type {{PLACE: {value: string, function: Function},
 * MOVE: {value: string, function: Function},
 * LEFT: {value: string, function: Function},
 * RIGHT: {value: string, function: Function},
 * REPORT: {value: string, function: Function}}}
 */
var commands = {
    PLACE: { value: "PLACE", function: function(x, y, facing) { placedRobot.place(x, y, facing) }},
    MOVE: { value: "MOVE", function: function() { placedRobot.move() }},
    LEFT: { value: "LEFT", function: function() { placedRobot.left() }},
    RIGHT: { value: "RIGHT", function: function() { placedRobot.right() }},
    REPORT: { value: "REPORT", function: function() { displayReport(placedRobot.report()) }}
};

/**
 * Error String Constants
 */
var EMPTY_INSTRUCTION_ERROR = "No instruction was entered";
var PLACE_INSTRUCTION_EXPECTED_ERROR = "Robot has not been placed - Use the 'PLACE X, Y, F' command to place";
var BAD_INSTRUCTION_ERROR = "Bad instruction. Acceptable instructions are: " + Object.keys(commands).join(", ");
var INVALID_X = "The X coordinate entered is invalid - ensure X is a number between 0 and " + grid.width;
var INVALID_Y = "The Y coordinate entered is invalid - ensure Y is a number between 0 and " + grid.height;
var INVALID_FACING = "The facing you entered is invalid";

/**
 * Global instruction error string for display
 * @type {string}
 */
var instructionError = "";

/**
 * The placed robot to be moved around the table
 * @type {Robot}
 */
var placedRobot = new Robot();

/**
 * Gets the instruction from the user input.
 * Displays an instruction error if error occurs.
 */
function submitInstruction() {
    instructionError = "";
    // get the value of the instructions and separate it by new line into an array
    var rawInstructions = document.getElementById("instruction-input").value.toUpperCase();
    runInstruction(String(rawInstructions));
    document.getElementById("instruction-input").value = "";
    if (instructionError) {
        document.getElementById("errorDisplay").innerHTML = instructionError;
    } else {
        document.getElementById("errorDisplay").innerHTML = "";

    }
}

/**
 * Checks validity of instruction, and state of the current robot.
 * Runs the instruction.
 * @param instruction
 */
function runInstruction(instruction) {
    if (!instruction || instruction === undefined || instruction.trim() === "") {
        instructionError = EMPTY_INSTRUCTION_ERROR;
        return;
    }

    if (isPlaceInstruction(instruction)) {
        var placeObj = extractPlaceInstruction(instruction);

        if (!placeObj) {
            return;
        }
        placedRobot.place(placeObj.x, placeObj.y, placeObj.facing);
        return;

    }
    //check if robot has been placed
    if (!placedRobot.isPlaced()) {
        instructionError = PLACE_INSTRUCTION_EXPECTED_ERROR;
        return;
    }

    // at this point robot should be placed and ready for other instructions
    if (isValidInstruction(instruction)) {
        commands[instruction.toUpperCase()].function();
    } else {
        instructionError = BAD_INSTRUCTION_ERROR;
    }

}

/**
 * Validation check for instruction string.
 * @param instruction
 * @returns {boolean}
 */
function isValidInstruction(instruction) {
    if (isEmptyString(instruction)) {
        instructionError = EMPTY_INSTRUCTION_ERROR;
        return false;
    }

    if (instruction.split(" ").length > 1) {
        return false
    }

    return !!commands[instruction.toUpperCase()];
}

/**
 * Validation check for PLACE instruction string
 * @param instruction
 * @returns {boolean}
 */
function isPlaceInstruction(instruction) {
    if (!instruction || instruction === undefined || instruction.trim() === "") {
        instructionError = EMPTY_INSTRUCTION_ERROR;
        return false;
    }
    var instructionArray = instruction.toUpperCase().split(" ");
    return instructionArray[0].trim() === commands.PLACE.value;
}

/**
 * Extracts the PLACE instruction into an object to contain the x, y, and facing
 * for the robot to be placed.
 * @param instruction
 * @returns {{x: Number, y: Number, facing: string}}
 */
function extractPlaceInstruction(instruction) {
    instructionError = "";
    if (!isPlaceInstruction(instruction)) {
        instructionError = BAD_INSTRUCTION_ERROR;
        return;
    }

    var instructionArray = instruction.toUpperCase().split(" ");

    var extractedInstructionArray = instructionArray.splice(1).join("").split(",");

    var x = extractedInstructionArray[0];
    var y = extractedInstructionArray[1];
    var f = extractedInstructionArray[2];

    if (!isValidX(x)) {
        instructionError = INVALID_X;
        return;
    }
    if (!isValidY(y)) {
        instructionError = INVALID_Y;
        return;

    }
    if (!isValidFacing(f)) {
        instructionError = INVALID_FACING;
        return;
    }

    return {
        x: parseInt(x),
        y: parseInt(y),
        facing: f
    };

}

/**
 * Displays the report to the user interface.
 * @param report
 */
function displayReport(report) {
    console.log("report", report);
    document.getElementById('output').innerHTML = report;
}

/**
 * Validation check for X coordinate, checking that it is a number, and that is is within the grids bounds (width)
 * @param x
 * @returns {boolean}
 */
function isValidX(x) {
    return !isNaN(x) && parseInt(x) >= 0 && parseInt(x) <= grid.width;
}

/**
 * Validation check for Y coordinate, checking that it is a number, and that is is within the grids bounds (height)
 * @param x
 * @returns {boolean}
 */
function isValidY(y) {
    return !isNaN(y) && parseInt(y) >= 0 && parseInt(y) <= grid.height;
}

/**
 * Validation check for facing - checks that string is a valid direction
 * @param facing
 * @returns {boolean}
 */
function isValidFacing(facing) {
    return !isEmptyString(facing) && !!directions[facing.toUpperCase()];
}

/**
 * Util function that checks if a string is empty
 * @param s
 * @returns {boolean}
 */
function isEmptyString(s) {
    return !s || s === undefined || s.trim() === "";
}

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

var EMPTY_INSTRUCTION_ERROR = "No instruction was entered";
var PLACE_INSTRUCTION_EXPECTED_ERROR = "Robot has not been placed - Use the 'PLACE X, Y, F' command to place";
var BAD_PLACE_INSTRUCTION_ERROR = "Bad place instruction";
var INVALID_X = "The X coordinate entered is invalid - ensure X is a number between 0 and " + grid.width;
var INVALID_Y = "The Y coordinate entered is invalid - ensure Y is a number between 0 and " + grid.height;
var BOUNDS_EXCEEDED_Y = "Y bounds exceeded";
var INVALID_FACING = "The facing you entered is invalid";


var instructionError = "";

var placedRobot = new Robot();

var directions = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}

var commands = {
    PLACE: { value: "PLACE"},
    MOVE: { value: "MOVE" },
    LEFT: { value: "LEFT" },
    RIGHT: { value: "RIGHT" },
    REPORT: { value: "REPORT" }
};

function submitInstruction() {
    // get the value of the instructions and separate it by new line into an array
    var rawInstructions = document.getElementById("instruction-input").value.toUpperCase();
    runInstruction(String(rawInstructions));
    console.log(instructionError);
}

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

    }
    //check if robot has been placed
    if (!placedRobot.isPlaced()) {
        instructionError = PLACE_INSTRUCTION_EXPECTED_ERROR;
        return;
    }

}

function isPlaceInstruction(instruction) {
    if (!instruction || instruction === undefined || instruction.trim() === "") {
        instructionError = EMPTY_INSTRUCTION_ERROR;
        return false;
    }
    var instructionArray = instruction.toUpperCase().split(" ");
    return instructionArray[0].trim() === commands.PLACE.value;
}

function extractPlaceInstruction(instruction) {
    instructionError = "";
    if (!isPlaceInstruction(instruction)) {
        instructionError = BAD_PLACE_INSTRUCTION_ERROR;
        return;
    }

    var instructionArray = instruction.toUpperCase().split(" ");
    if (instructionArray.length !== 4) {

        instructionError = BAD_PLACE_INSTRUCTION_ERROR;
        return;
    }

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

function isValidX(x) {
    return !isNaN(x) && parseInt(x) >= 0 && parseInt(x) <= grid.width;
}

function isValidY(y) {
    return !isNaN(y) && parseInt(y) >= 0 && parseInt(y) <= grid.height;
}

function isValidFacing(facing) {
    if (!facing || facing === undefined || facing.trim() === "") {
        return false;
    }
    return !!directions[facing.toUpperCase()];
}



function extractPlaceCommand(stringCommand) {
    var placeInsArray = stringCommand.split(/,/);

    if (placeInsArray.length === 3 &&
        placeInsArray[0].trim().indexOf(commands.PLACE) == 0) {

        // remove place command
        placeInsArray[0] = placeInsArray[0].substr(commands.PLACE.length, placeInsArray[0].length);

        return placeInsArray;

    } else {
        throw new Error("Bad input data");
    }
}



let chosenArraySize = 5;
let values;

let comparisons = 0;
function startSort() {
    mySorting.start();
    values = new Array(chosenArraySize);
    for (let index = 0; index < values.length; index++) {
        values[index] = index + 1;
    }
    values.fyShuffle();
    draw();
}

let mySorting = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.canvas.style.backgroundColor = "black";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function draw() {
    mySorting.context.clearRect(0, 0, mySorting.canvas.width, mySorting.canvas.height);
    bubbleSort();
    sortVisually(values);
}
var drawInterval = setInterval(draw, 1);

function sortVisually(values) {
    let ctx = mySorting.context;
    for (let position = 0; position < chosenArraySize; position++) {
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white"
        ctx.beginPath();       // Start a new path


        ctx.fillRect(position * (chosenArraySize / (chosenArraySize / 10)), (mySorting.canvas.height) - (values[position] * (mySorting.canvas.height / chosenArraySize)), 10, mySorting.canvas.height);
        ctx.stroke();          // Render the path

    }
    comparisons = comparisons + 1;
}

/**
 * SORTING ALGORITHMS
 * 
 * 
 */

/* Fisher  */
/*
Bubble sort algorithm
function bubbleSort(values) {
    for (let outer = 0; outer < values.length; outer++) {
        for (let inner = 0; inner < values.length - outer - 1; inner++) {
            if (a > b) {
                swapValues(values);
            }
        }
    }
}*/

let outer = 0;
let inner = 0;
function bubbleSort() {
    if (values[inner] > values[inner + 1]) {
        swapValues(values);
    }

    if (outer < values.length) {
        inner = inner + 1;
        if (inner >= values.length - outer - 1) {
            inner = 0;
            outer = outer + 1;
        }
    } else {
        clearInterval(drawInterval);
    }
}

function swapValues(values) {
    let temp = values[inner]
    values[inner] = values[inner + 1];
    values[inner + 1] = temp;
}

document.body.onload = startSort();
document.body.style.backgroundColor = "lightgray";

let chosenArraySize = 100;
var values, selectedSort, sortSelector, drawInterval;

document.querySelector(".start").addEventListener("click", () => {
    var select = document.querySelector(".selectSort");
    selectedSort = select.options[select.selectedIndex].value;
    mySorting.startSorting(sortSelector(selectedSort));
})

document.querySelector(".stop").addEventListener("click", () => {
    clearInterval(drawInterval);
})

document.querySelector(".reset").addEventListener("click", () => {
    clearInterval(drawInterval);
    reset();
})

function init() {
    mySorting.init();
    sortVisually(createArray());
}

function reset() {
    mySorting.init();
    outer = 0;
    inner = 0;
    sortVisually(createArray());
}

function createArray() {
    values = new Array(chosenArraySize);
    for (let index = 0; index < values.length; index++) {
        values[index] = index + 1;
    }
    values.fyShuffle();
    return values;
}

let mySorting = {
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = 1111;
        this.canvas.height = 500;
        this.canvas.style.backgroundColor = "black";
        this.context = this.canvas.getContext("2d");
        document.querySelector(".wrapper").insertBefore(this.canvas, document.querySelector(".wrapper")[0]);
    },
    startSorting: function (selectedSort) {
        drawInterval = setInterval(draw(selectedSort), 1);
    },
    stopSorting: function () {
        clearInterval(this.interval);
    }
}

function draw(sort) {
    return function () {
        mySorting.context.clearRect(0, 0, mySorting.canvas.width, mySorting.canvas.height);
        sort();
        sortVisually(values);
    }
}

function sortVisually(values) {
    let ctx = mySorting.context;
    for (let position = 0; position < chosenArraySize; position++) {
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white"
        ctx.beginPath();       // Start a new path
        ctx.fillRect(position * (chosenArraySize / 9), (mySorting.canvas.height) - (values[position] * (mySorting.canvas.height / chosenArraySize)), 10, mySorting.canvas.height);
        ctx.stroke();          // Render the path
    }
}

/**
 * SORTING ALGORITHMS
 *
 *
 */

/* Fisher-Yates Shuffle Algorithm */
Array.prototype.fyShuffle = function () {
    let temp, j, n = this.length;
    while (--n != 0) {
        j = Math.floor(Math.random() * (n + 1));
        temp = this[j];
        this[j] = this[n];
        this[n] = temp;
    }
    return this;

}




let outer = 0;
let inner = 0;
function sortSelector(selected) {
    if (selected === "bubbleSort") {
        return bubbleSort;
    }
}

/*  Bubble sort algorithm
    function bubbleSort(values) {
        for (let outer = 0; outer < values.length; outer++) {
            for (let inner = 0; inner < values.length - outer - 1; inner++) {
                if (a > b) {
                    swapValues(values);
                }
            }
        }
    }
*/

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

function quickSort() {

}

function swapValues(values) {
    let temp = values[inner]
    values[inner] = values[inner + 1];
    values[inner + 1] = temp;
}

document.body.onload = init();
document.body.style.backgroundColor = "lightgray"; 
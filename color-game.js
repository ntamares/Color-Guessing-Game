var colors = [];
var numSquares = 6;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var resultDisplay = document.getElementById("result");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setupModeButtons();
    setupSquares();
    reset();
}


function changeColors(color) {
    // change all colors to correct (winning) color
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
}

function generateRandomColors(num) {
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resultDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "#steelblue";
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }

    resetButton.addEventListener("click", function(){
        reset();
    });
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        // squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                resultDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = "#232323";
                resultDisplay.textContent = "Try Again";
            }
        });
    }
}
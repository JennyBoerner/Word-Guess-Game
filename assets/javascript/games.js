

var animals = ["COW", "PIG", "CAT", "DOG", "FROG"];
var maxGuesses = 10;
var guessedLetters = [];
var currentWordIndex;
var currentWord = [];
var remainingGuesses = 0;
var finished = true;
var wins = 0;

function resetGame() {
    remainingGuesses = maxGuesses;
    currentWordIndex = Math.floor(Math.random() * (animals.length));
    guessedLetters = [];
    currentWord = [];
    for (var i = 0; i < animals[currentWordIndex].length; i++) {
        currentWord.push("_");
    };
    document.getElementById("tryAgainText").style.cssText = "display: none";
    document.getElementById("wonText").style.cssText = "display: none";
    document.getElementById("gameOverText").style.cssText = "display: none";
    updateDisplay();
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    var currentWordText = "";
    for (var i = 0; i < currentWord.length; i++) {
        currentWordText += currentWord[i];
    }
    document.getElementById("currentWord").innerText = currentWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < animals[currentWordIndex].length; i++) {
        if(animals[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        document.getElementById("wonText").style.cssText = "display: block";
        document.getElementById("tryAgainText").style.cssText = "display: block";
        wins++;
        finished = true;
    }
};

function checkLoss() {
    if(remainingGuesses <= 0) {
        document.getElementById("gameOverText").style.cssText = "display: block";
        document.getElementById("tryAgainText").style.cssText = "display: block";
        finished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

document.onkeydown = function(event) {
    if(finished) {
        resetGame();
        finished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurnX = new Audio("tingX.mp3");
let audioTurnO = new Audio("tingO.mp3");
let gameover = new Audio("gameover.mp3");

let isgameover = false;
let turn = "X";
let isUserTurn = true;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "21vw";
            gameover.play();
        }
    });

    // Check for draw if no win
    if (!isgameover) {
        let draw = true;
        Array.from(boxtext).forEach(element => {
            if (element.innerText === '') {
                draw = false;
            }
        });
        if (draw) {
            document.querySelector('.info').innerText = "It's a DRAW";
            isgameover = true;
        }
    }
};

// Function for computer to make a move
const computerMove = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let emptyBoxes = [];
    Array.from(boxtext).forEach((element, index) => {
        if (element.innerText === '') {
            emptyBoxes.push(index);
        }
    });

    // If there are empty boxes, choose one at random
    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[randomIndex].innerText = turn;
        if (turn === "X") {
            audioTurnX.play();
        } else {
            audioTurnO.play();
        }
        checkWin();
        if (!isgameover) {
            turn = changeTurn();
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            isUserTurn = true;
        }
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover && isUserTurn) {
            boxtext.innerText = turn;
            if (turn === "X") {
                audioTurnX.play();
            } else {
                audioTurnO.play();
            }
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                isUserTurn = false;
                setTimeout(computerMove, 1000); // Delay for computer's move
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    isUserTurn = true;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});

const PLAYER_TURN = 'x';
const COMPUTER_TURN = 'circle';
const Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const cellElements = document.querySelectorAll('[game-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector(
    '[data-winning-message-text]'
);
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startBtn');
let circleTurn;

startGame();
startButton.addEventListener('click', function () {
    document.getElementById('start').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
});
restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(PLAYER_TURN);
        cell.classList.remove(COMPUTER_TURN);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

AiTurn();

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? COMPUTER_TURN : PLAYER_TURN;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${
            circleTurn ? "O's" : "X's"
        } Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(PLAYER_TURN) ||
            cell.classList.contains(COMPUTER_TURN)
        );
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(COMPUTER_TURN);
    board.classList.remove(PLAYER_TURN);
    if (circleTurn) {
        board.classList.add(COMPUTER_TURN);
    } else {
        board.classList.add(PLAYER_TURN);
    }
}

function checkWin(currentClass) {
    return Winning_Combinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function randomNumber() {
    return Math.floor(Math.random() * 8);
}

function AiTurn() {
    let random = randomNumber();
    for (let cell of cellElements) {
        if (cell.contains(PLAYER_TURN) || cell.contains(COMPUTER_TURN)) {
            continue;
        } else {
            placeMark();
        }
    }
}

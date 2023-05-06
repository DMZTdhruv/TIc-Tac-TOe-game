const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector('#info');

const startCells = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
];

let gameOver = false;
let go = 'circle';
function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index + 1;
        gameBoard.append(cellElement);
        cellElement.addEventListener('click', addGo)
    })
}

function addGo(e) {
    if (gameOver) return;
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = (go === 'circle') ? 'cross' : 'circle';
    infoDisplay.innerHTML = `Its ${go}'s trun`;
    e.target.removeEventListener('click', addGo)
    checkScore();
}


function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let circleWins = false;
    winningCombos.forEach(combo => {
        if (combo.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))) {
            circleWins = true;
            gameOver = true;
            return;
        }
    });

    let crossWins = false;
    winningCombos.forEach(combo => {
        if (combo.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))) {
            crossWins = true;
            gameOver = true;
            return;
        }
    })

    console.log(circleWins);
    if (circleWins) {
        infoDisplay.textContent = `Circle is the winner`;
        return;
    } else if (crossWins) {
        infoDisplay.textContent = `Cross is the winner`;
        return;
    } else if (Array.from(allSquares).every(square => square.firstChild)) {
        infoDisplay.textContent = `It's a tie`;
        gameOver = true; 
    }

}

function Execution() {
    createBoard();
}


Execution();

const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector('#info');
const menu = document.querySelector('.menu');
let score = document.querySelector('.scores');

alert('Welcome to DMZT TIC-TAC-TOE game\nUser1 will have to choose [Circle]\nUser2 will have to choose [Cross]')
let user1 = prompt('Enter user1 name: ');
let user2 = prompt('Enter user2 name: ');

let user1Score = 0;
let user2Score = 0;

function Scores(){
    let scoreHeading = document.createElement('h2');
    scoreHeading.innerHTML = 'CURRENT SCORES';
    let score1 = document.createElement('span');
    let breakline = document.createElement('br');
    score1.id = 'score1';
    let score2 = document.createElement('span');
    score2.id = 'score2';
    score1.innerHTML = `${user1}'s Score is: 0` ;
    score2.innerHTML = `${user2}'s Score is: 0` ;
    score.append(scoreHeading,score1,breakline,score2);
}

Scores();


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
            combo.every(cell => allSquares[cell].style.background = 'blue')
            gameOver = true;
            return;
        }
    });

    let crossWins = false;
    winningCombos.forEach(combo => {
        if (combo.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))) {
            crossWins = true;
            gameOver = true;
            combo.every(cell => allSquares[cell].style.background = 'red')
            return;
        }
    })
    
    if (circleWins) {
        infoDisplay.textContent = `Circle is the winner`;
        user1Score++;
        document.querySelector('#score1').innerHTML = `${user1}'s Score is: ${user1Score}`;
        return;
    } else if (crossWins) {
        infoDisplay.textContent = `Cross is the winner`;
        user2Score = user2Score + 1;
        document.querySelector('#score2').innerHTML = `${user2}'s Score is: ${user2Score}`;
        return;
    } else if (Array.from(allSquares).every(square => square.firstChild)) {
        infoDisplay.textContent = `It's a tie`;
        gameOver = true; 
    }

}

function Restart(){
    let btn = document.createElement('button');
    btn.classList.add('restart');
    btn.innerHTML = 'Clear Board';
    menu.append(btn);
    btn.addEventListener('click',()=>{
        let ask = confirm('Do you want to restart\nIt won\'t affect the scores');
        if(ask){
            Clear()
        }
    });
}

function Clear(){
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }
    infoDisplay.innerHTML = `its ${go}'s turn`;
    createBoard();
    gameOver = false;
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    return "Scores will be lost"
});
  
Restart();

function Execution() {
    createBoard();
}


Execution();

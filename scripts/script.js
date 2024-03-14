// Grab items from html
const scoreOutput = document.getElementById('score-output');
const timerOutput = document.getElementById('timer-output');
const startBtn = document.getElementById('start-button');
const waterHoles = document.querySelectorAll('.water');
const sharks = document.querySelector('.shark');
const gameOverMessage = document.getElementById('message-game-over');
const gameOverScore = document.getElementById('game-over-score');
const gameOverBtn = document.getElementById('game-over-button');
const openGameBtn = document.getElementById('open-game-btn');
const popUpWindow = document.getElementById('pop-up-window');
const gameWindow = document.getElementById('game-window');


// Game Audio
const gameAudio = new Audio("media/music-for-arcade-style-game-146875.mp3");
const scoreAudio = new Audio("media/coin_c_02-102844.mp3");
const gameOverAudio = new Audio("media/videogame-death-sound-43894.mp3");


// Set variables
let scoreResult = 0;
let timer;
let currentTimer = 60;
let sharkTimerId = null;
let previousHole = null;
let previousShark = null;

// Open Game window
openGameBtn.addEventListener("click", openGame);

function openGame() {
    popUpWindow.style.display = 'none';
    gameWindow.style.display = 'block';

}


// Start game button
startBtn.addEventListener("click", startGame);


// Shark appears once game is started
function startGame() {

    gameAudio.currentTime = 0;
    gameAudio.play();

    if (startBtn.textContent === 'Start Game') {
        moveShark();
        startBtn.textContent = 'Stop Game';
    timer = setInterval(timeDown, 1000)
    } else {
        gameOver();
    }   
};


// Make timer go down once game has started


function timeDown() {
    currentTimer--;
    timerOutput.textContent = currentTimer;
    if (currentTimer === 0) {
        gameOver();
    }
}


// Make shark appear in random holes (1-9) but never repeat previous hole

function randomHole(){
    
    if (previousShark) {
        previousShark.remove();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 9);
    } while (previousHole === randomIndex);

    previousHole = randomIndex;

    let randomHole = waterHoles[randomIndex]
    let shark = document.createElement('div');
    shark.classList.add('shark');
    randomHole.appendChild(shark);

    previousShark = shark;
   
};


// Set shark position on a timer
function moveShark() {
    sharkTimerId = setInterval(randomHole, 570)
};


// Click on the shark
waterHoles.forEach(waterHole => waterHole.addEventListener('click', whackShark))


// Each time shark is hit add 10 points 
function whackShark(event) {
    if (event.target.classList.contains('shark')) {
        scoreResult += 10;
        scoreOutput.textContent = scoreResult;

        scoreAudio.pause();
        scoreAudio.currentTime = 0;
        scoreAudio.play();
    }
};

// When the game runs out of time
function gameOver() {
    
    if (previousShark) {
         previousShark.remove();
     }

    gameOverMessage.style.display = 'block';
    startBtn.disabled = true;
    startBtn.textContent = 'Start Game';
    clearInterval(sharkTimerId);
    clearInterval(timer);
    gameOverScore.textContent = scoreResult;
    gameAudio.pause();
    gameOverAudio.play();
};



// When the user presses "ok" button on game over messsage
function restartGame() {
    gameOverMessage.style.display = 'none';
    scoreOutput.textContent = 0;
    scoreResult = 0;
    startBtn.disabled = false;
    currentTimer = 60;
    timerOutput.textContent = currentTimer;
    
}

gameOverBtn.addEventListener('click', restartGame);












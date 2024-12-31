let gameBg = document.getElementById("game");
let mainMenu = document.getElementById("mainMenu");
let gameOver = document.getElementById("gameOver");
let players = document.getElementById("players");

const map = document.getElementById("bg");
const ctx = map.getContext('2d');
const scoreboard = document.getElementById("scrb");
let fps = 60;

map.style.backgroundColor = "#00000";

const player = new Platform(200,820, 15,110, "#00FD82", 10);
const ball = new Ball(250,650, 10, "#B400FF", 2.5,1,0);

let animationFrame; 

let gameEnded = false;
function ifEnd(){
if(gameEnded){
    return;
}

    let leftBl=0;
    for (const blockRow of blockGrid) {
        for (const block of blockRow) {
            if (block.durability > 0) {
                leftBl++;
            }
        }
    }

    if(leftBl==0){
        stopGame();
        gameEnded = true;
    }
}

function gameLoop(){
    ball.draw();
    ball.move();

    ifEnd();
    drawBlocks();
    scoreboard.innerHTML = points;

    player.draw();
    animationFrame = requestAnimationFrame(gameLoop);
}

function startGame(){
    gameBg.style.display = "block";
    mainMenu.style.display = "none";
    gameLoop();
}

function stopGame(){
    gameOver.style.display = "grid";
    document.getElementById("playerScore").innerHTML = points;

    ball.delete();
    player.delete();

    if(animationFrame){
        cancelAnimationFrame(gameLoop);
    }
    gameEnded=true;
}

//sterowanie platformą
window.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft' || event.key == 'a'){
        player.move('left');
    }
    else if(event.key == 'ArrowRight' || event.key == 'd'){
        player.move('right');
    }
});


const fileInput = document.getElementById('fileInput')

function addScore(){
    let newScore = points;
    let name = document.getElementById("name").value;

    const prevData = localStorage.getItem('playerData');
    let newData = prevData ? JSON.parse(prevData) : {};
    newData[name] = newScore;

    localStorage.setItem('playerData', JSON.stringify(newData));

    gameOver.style.display = "none";
    gameBg.style.display = "none";
    mainMenu.style.display = "grid";
    //console.log(localStorage.getItem('playerData'));
}

function showScoreboard(){
    players.style.display = "grid";
    
    const storedData = localStorage.getItem('playerData');
    let id = 1;

    if(storedData){
        const data = JSON.parse(storedData);
        for(const playerName in data){
            const playerScore = data[playerName];
            players.innerHTML += id + ". " + playerName + " : " + playerScore + "<br>";
            id++;
        }  
    }else{
        players.innerHTML += "N/A" + "\n";
    }
}

/*let top3 = () => {
    let gracz,punkty;
    let miejsce = { gracz, punkty};
    miejsce.gracz = "Kamil";
    miejsce.punkty = 1000;
    for(let i=0;i<3;i=i+1){
        document.getElementById("top3").innerHTML += i+1 + ". " + miejsce.gracz + ": " + miejsce.punkty + "<br>";
    }
}*/

//localStorage.clear();
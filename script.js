function start(){
    var start=document.getElementById("start");
    var select=document.getElementById("menu");
    var players = document.getElementById("players")
    start.style.display= "none";
    select.style.display="flex";
    players.style.display="flex";
}
document.getElementById("onePlayerBtn").addEventListener('click',function() {
    startGame('1p');
});
document.getElementById("twoPlayerBtn").addEventListener('click',function() {
    startGame('2p');
});
let currentPlayer = "X";
let gameMode = "";

function startGame(mode){
    gameMode=mode;
    document.getElementById("menu").style.display="none";
    document.getElementById("players").style.display="none";
    document.getElementById("start").style.display="none";
    document.getElementById("board").style.display = "grid";
    document.getElementById("Events").style.display = "flex";
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick ,{once :true});
    });
}

function handleClick(e){
    const cell=e.target;
    placeMark(cell,currentPlayer);

    if(checkWin(currentPlayer)){
        document.getElementById('para2').innerHTML= currentPlayer+' Won the game.';
        currentPlayer=" ";
        console.log(currentPlayer+ "wins");
    }else if(checkDraw()){
        document.getElementById('para2').innerHTML='This Game is draw.';
        console.log("this game is draw");
    }else{
        swapTurns();
        if(gameMode==='1p' && currentPlayer==='O'){
            computerMove();
            document.getElementById('para2').innerHTML='Computer\'s Turn';
        }else if(currentPlayer===" "){
            document.getElementById('para2').innerHTML='Click Reset to play the Game Again.';
        }else{
            document.getElementById('para2').innerHTML=currentPlayer+' \'s Turn';
        }
        
    }
}

function placeMark(cell,player){
    cell.textContent = player;
}

function swapTurns(){
    if (currentPlayer==='X') {
        currentPlayer='O';
    }else if(currentPlayer==='O'){
        currentPlayer='X';
    }
}

function checkWin(player){
    const cells = document.querySelectorAll('[data-cell]');
    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return winPatterns.some(pattern =>{
        return pattern.every(index=> {
            return cells[index].textContent === player;
        })
    });
}

function checkDraw(){
    const cells= document.querySelectorAll('[data-cell]');
    return [...cells].every(cell => {
        return cell.textContent==='X' || cell.textContent==='O';
    });
}
function resetGame(){
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.textContent='';
    });
    currentPlayer="X";
    document.getElementById("para2").innerHTML='X \'s turn';
    addEventListener('click',function() {
        startGame(gameMode);
    });
}
function back(){
    document.getElementById('menu').style.display="flex";
    document.getElementById('players').style.display="flex";
    document.getElementById('Events').style.display="none";
    document.getElementById("board").style.display="none";
};

function computerMove(){
    const cells = document.querySelectorAll('[data-cell]');
    let emptyCells = [];

    cells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCells.push(cell);
        }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];

    setTimeout(() => {
        placeMark(selectedCell, 'O');
        if (checkWin('O')) {
            document.getElementById('para2').innerHTML= currentPlayer+' Won the game.';
            currentPlayer=" ";
            console.log(currentPlayer+ "wins");
        } else if (checkDraw()) {
            document.getElementById('para2').innerHTML='This Game is draw.';
            console.log("this game is draw");
        } else {
            swapTurns();
            document.getElementById('para2').innerHTML=currentPlayer+' \'s Turn';
        }
    }, 500);
};


/*const compPattern = [[0,1],[0,3],[0,4],[1,2],[2,4],[2,5],[5,8],[4,8],[7,8],[3,6],[6,7],[6,4],[3,4],[4,5]];
    return compPattern.shift(pattern =>{
        return pattern.every(index =>{
            if(cells[index].textContent==='X'){
                
            }
        })
    });*/
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

var turn = 'X';
var warning = '';
var statusPlaying = true;
var gameBoard = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
var points_x = 0;
var points_o = 0;

resetWithRestrictions(true);
c('div.score-item:nth-child(1)').addEventListener('click', () => {
    if(statusPlaying === false) turn = "X";
});
c('div.score-item:nth-child(2)').addEventListener('click', () => {
    if(statusPlaying === false) turn = "O";
});
c('div.actions button#restart').addEventListener('click', () => {
    resetWithRestrictions(true);
});
c('div.actions button#play-again').addEventListener('click', () => {
    resetWithRestrictions(false);
});
cs('div.item').forEach(element => element.addEventListener('click', render));

function render(e){
    if(statusPlaying === true){
        warning = 'Match in progress...';
        var selectedObject = e.target;
        var position = selectedObject.getAttribute('position');
        if(gameBoard[position] === ""){
            if(turn === 'X'){
                gameBoard[position] = 'X';
                c(`div.item[position*=${position}]`).innerHTML = "<div class='x'><div class='stick1'></div><div class='stick2'></div></div>";
                turn = 'O';
                check('X');
            } else if(turn === 'O'){
                gameBoard[position] = 'O';
                c(`div.item[position*=${position}]`).innerHTML = "<div class='circle'></div>";
                turn = 'X';
                check('O');
            }
        }
        setTimeout(()=>{
            cs("div.circle, div.x").forEach(element => {
                element.style.bottom = "0px";
                element.style.opacity = 1;
            });
        }, 0);
        current();
        c('div.warning').innerHTML = warning;
        c('p.points-x').innerHTML = points_x;
        c('p.points-o').innerHTML = points_o;
    }
}

function resetWithRestrictions(constraint){
    for(let i in gameBoard){
        gameBoard[i] = '';
    }
    cs('div.container div.item div.circle, div.container div.item div.x').forEach(element => {
        element.remove();
    });

    if(constraint === true){
        statusPlaying = true;
        warning = "Start the game or choose a player.";
        points_x = points_o = 0;
    } else if(constraint === false){
        warning = "Match in progress...";
        statusPlaying = true;
    }
    
    c('p.points-x').innerHTML = points_x;
    c('p.points-o').innerHTML = points_o;
    c('div.actions button#restart').style.display = 'none';
    c('div.actions button#play-again').style.display = 'none';
    c('div.warning').innerHTML = warning;
}

function current(){
    if(check('X')){
        points_x++;
        warning = "O jogador X venceu!";
        statusPlaying = false;
        c('div.actions button#play-again').style.display = "block";
        c('div.actions button#restart').style.display = "block";
    } else if(check('O')){
        points_o++;
        warning = "O jogador O venceu!";
        statusPlaying = false;
        c('div.actions button#play-again').style.display = "block";
        c('div.actions button#restart').style.display = "block";
    } else if(draw()){
        warning = "Empate!";
        c('div.actions button#play-again').style.display = "block";
        c('div.actions button#restart').style.display = "block";
    }
}

function check(player) {
    const possibilities = [
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b2', 'c3'],
        ['c1', 'b2', 'a3']
    ];

    for (let i = 0; i < possibilities.length; i++) {
        const match = possibilities[i];
        let hasWon = true;

        for (let j = 0; j < match.length; j++) {
            if (gameBoard[match[j]] !== player) {
                hasWon = false;
                break;
            }
        }

        if (hasWon) {
            return true;
        }
    }

    return false;
}

function draw(){
    for(let position in gameBoard){
        if(gameBoard[position] === ''){
            return false;
        }
    }
    return true;
}


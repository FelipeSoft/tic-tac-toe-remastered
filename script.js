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

reset();
cs('div.item').forEach(element => element.addEventListener('click', render));

function render(e){
    var selectedObject = e.target;
    if(gameBoard[selectedObject.getAttribute('position')] === ""){
        if(turn === 'X'){
            gameBoard[selectedObject.getAttribute('position')] = 'X';
            c(`div.item[position*=${selectedObject.getAttribute('position')}]`).innerHTML = "<div class='x'><div class='stick1'></div><div class='stick2'></div></div>";
            turn = 'O';
            check('X');
        } else if(turn === 'O'){
            gameBoard[selectedObject.getAttribute('position')] = 'O';
            c(`div.item[position*=${selectedObject.getAttribute('position')}]`).innerHTML = "<div class='circle'></div>";
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
}

function reset(){
    warning = "Começar o jogo ou selecionar jogador";
    var gameBoard = {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    }
}

function warning(){

}

function current(){
    if(check('X')){
        points_x++;
        c('div.points-x').innerHTML = points_x;
        warning = "O jogador X venceu!";
    } else if(check('O')){
        points_o++;
        c('div.points-o').innerHTML = points_o;
        warning = "O jogador O venceu!";
    } else if(draw()){
        warning = "Empate!";
    }
}

function check(player){
    let possibilities = [
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b2,c3',
        'c1,b2,a3'
    ];

    for(let position in possibilities){
        let match = possibilities[position].split(",")
        let hasWon = match.every(element => gameBoard[element] === player);
        if(hasWon) return true;
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


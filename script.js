const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

var turn = 'x';
var statusPlaying = false;
var gameBoard = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
var x = c('div.')

cs("div.item").forEach(element => element.addEventListener('click', selectObject));

function selectObject(e){
    var selectedObject = e.target;
    var playerElement = document.createElement('div')
    if(turn === 'x'){
        playerElement.createElement('div')
    }
    playerElement.classList.add('circle');
    selectedObject.appendChild(playerElement);
}

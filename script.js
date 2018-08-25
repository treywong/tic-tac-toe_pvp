/*  JS plans:
	1. Players take turns to click on the boxes to insert X or O.
	2. When 3 X's or O's are in a row, a point is given to that player.
	   (Hint with a line going through or highlighting the boxes)
	3. After that, a button can be clicked to start a new game.
*/

//The initial variables created for the functions below
let cellBlocks = document.getElementsByClassName('cell'); //An array of all the cell blocks
let player1 = {headline:"Player 1: X", piece: "X", victory: ["X","X","X"], victoryCheer: "Player 1 Wins!", points: 0}; //An object list for Player 1
let player2 = {headline:"Player 2: O", piece: "O", victory: ["O","O","O"], victoryCheer: "Player 2 Wins!", points: 0}; //An object list for Player 2
let drawPoints = 0; //The score when a draw occurs
let currentPlayer = player1; //Initial player turn

let victoryConditions = ['top','mid','bot','left','half','right','goingDown','goingUp']; //A list of all the victory conditions available by using the class names
let conditionLength = victoryConditions.length; //The number of victory conditions in the list
let drawCounter = 0; //A counter to indicate a draw when all the cells are filed

document.getElementById('player-turn').innerHTML = currentPlayer.headline //To indicate who goes next
document.getElementById('player1-points').innerHTML = player1.points //The score for Player 1
document.getElementById('player2-points').innerHTML = player2.points //The score for Player 2
document.getElementById('draw-points').innerHTML = drawPoints //The score for draws

//A function to change the players turn
function playerChange() {
	if (currentPlayer == player1) {
		currentPlayer = player2
	} else {
		currentPlayer = player1
	}
}

//A function to update score
function playerPointWin() {
	if (currentPlayer == player1) {
		player1.points++
		document.getElementById('player1-points').innerHTML = player1.points
	} else {
		player2.points++
		document.getElementById('player2-points').innerHTML = player2.points
	}
}

//A function to clear the board
function boardClear() {
	drawCounter=0
	for (let zz = 0; zz < cellBlocks.length; zz++) {
		cellBlocks[zz].innerHTML = ""
	}
}


//A function to check if a victory condition is filled and apply the correct results
function conditionChecker() {
	let currentCondition;
	let point;
	for (let jj = 0; jj < conditionLength; jj++) {
		point = 0;
		currentCondition = document.getElementsByClassName(victoryConditions[jj])
		for (let count = 0; count < 3; count++) {
			if (currentCondition[count].innerHTML == currentPlayer.piece) {
				point++;
			}
		}
		if (point >= 3) {
			playerPointWin()
			document.getElementById('comments').innerHTML = currentPlayer.victoryCheer
			boardClear()
		}
	}
	playerChange()
	document.getElementById('player-turn').innerHTML = currentPlayer.headline
}


//For the forms
for(let ii = 0; ii < cellBlocks.length; ii++) {
	let item = cellBlocks[ii];
	item.onclick = function(event) {
		const elementClickedOn = event.target;
		if (document.getElementById('comments').innerHTML != "") {
			document.getElementById('comments').innerHTML = ""
		}
		if (elementClickedOn.innerHTML == "") {
			elementClickedOn.innerHTML = currentPlayer.piece
			drawCounter++
			conditionChecker()
			if (drawCounter >= cellBlocks.length) {
				drawPoints++
				document.getElementById('draw-points').innerHTML = drawPoints
				boardClear()
				document.getElementById('comments').innerHTML = "Draw!"
			}
		}
	}
}
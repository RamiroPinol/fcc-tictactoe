var TicTacToe = {
	board: [[0,0,0], [0,0,0], [0,0,0]],
	currentPlayer: 1,
	moves: 0,
	pointsX: 0,
	pointsO: 0,
	end: false,

	//Changes player's turn
	changeTurn: function(currentPlayer) {
		this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
	},

	//Place player's move on board and changes turn
	move: function(row, col) {
		var self = this;
		if (self.board[row][col] == 0) {
			self.board[row][col] = self.currentPlayer;
		}
		self.changeTurn();
		self.checkGame(self.board);

		// Debug
		self.debug();
	},

	debug: function() {
		console.log(this.board[0], this.board[1], this.board[2]);
		console.log("Player: ", this.currentPlayer, "Moves: ", this.moves);
	},

	clear: function() {
		this.board = [[0,0,0], [0,0,0], [0,0,0]];
		this.currentPlayer = 1;
		this.moves = 0;
		this.end = false;
	},

	resetGame: function() {
		this.clear();
		this.pointsX = 0;
		this.pointsO = 0;
	},

	// Checks if a player as won the game

	checkGame: function(board) {
		var self = this;

		// Check for tic-tac-toe in row
		for (var i = 0; i < board.length; i++) {
			var equal = board[i][0] == board[i][1] && board[i][1] == board[i][2];

			if (equal && board[i].indexOf(1) != -1) {
    		this.end = true;
    		return self.endGame("X");

    	} else if (equal && board[i].indexOf(2) != -1) {
    		this.end = true;
      	return self.endGame("O");
	    }
		}

	  // Check for tic-tac-toe on column
	  for (var i = 0; i < 3; i++) {

	    if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
	      if (board[0][i] == 1) {
	      	this.end = true;
	        return self.endGame("X");

	      } else if (board[0][i] == 2) {
	      	this.end = true;
	        return self.endGame("O");
	      }
	    }
	  }

	  // Check for cross tic-tac-toe
	  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
	      board[0][2] == board[1][1] && board[1][1] == board[2][0]) {

	    if (board[1][1] == 1) {
	    	this.end = true;
	        return self.endGame("X");

	      } else if (board[1][1] == 2) {
	      	this.end = true;
	        return self.endGame("O");
	      }
	  }

	  this.moves += 1;

	  if (this.moves == 9 && this.end == false) {
			return this.endGame("T");
		}
	}, 

	endGame: function(symbol) {
	  if(symbol == "X") {
	  	this.pointsX += 1;
	  	$("#finishText").html("X Wins!");

	  } else if (symbol == "O") {
	  	this.pointsO += 1;
	    $("#finishText").html("O Wins!");

	  } else if (symbol == "T"){
	    $("#finishText").html("It's a tie...");
	  }
	  $("#finishModal").css("display", "block");
	}
}

$(document).ready(function($) {

	// When user clicks on the button, open the modal
	$("#myBtn").click(function() {
	    $("#finishModal").css("display", "block");
	});

	// When user clicks "Play again", new game starts and modal closes
	$(".btnPlayAgain").click(function() {
		newGame();
		$("#finishModal").css("display", "none");
	});
	
	$(".btnReset").click(function() {
		resetGame();
		$("#finishModal").css("display", "none");
	});

	// For every square, if empty, do move and print symbol
	$("[class^='square']").each(function() {
		var square = $(this);

		square.click(function() {

			if (square.text() == "") {
				printSymbol(square);
				move(square.attr('class'));
				
			}
		});
	})
});

function move(square) {
	switch (square) {
		case "square1":
			TicTacToe.move(0,0);
			break;
		case "square2":
			TicTacToe.move(0,1);
			break;
		case "square3":
			TicTacToe.move(0,2);
			break;
		case "square4":
			TicTacToe.move(1,0);
			break;
		case "square5":
			TicTacToe.move(1,1);
			break;
		case "square6":
			TicTacToe.move(1,2);
			break;
		case "square7":
			TicTacToe.move(2,0);
			break;
		case "square8":
			TicTacToe.move(2,1);
			break;
		case "square9":
			TicTacToe.move(2,2);
			break;
	}
};

function printSymbol(square) {
	TicTacToe.currentPlayer == 1 ? square.text("X") : square.text("O");
};

// Resets board
function newGame() {
	TicTacToe.clear();

	updatePoints();

	$("[class^='square']").each(function() {
		var square = $(this);
		square.text("");
	});
}

function start() {
	newGame();
	/*
	if ($('[value="1player"]').is(':checked')) {
		//Aca hago lo que necesito para jugar vs pc
	}
	*/
	if ($('[value="square"]').is(':checked')) {
		$("#symbolP1").text("O");
		$("#symbolP2").text("X");
	}

	$("#gameModal").css("display", "none");
	
}

// Updates points in board based on player's symbol
function updatePoints() {
	if ($("#symbolP1").html() == "X") {
		$("#scoreP1").html(TicTacToe.pointsX);
		$("#scoreP2").html(TicTacToe.pointsO);
	} else {
		$("#scoreP2").html(TicTacToe.pointsX);
		$("#scoreP1").html(TicTacToe.pointsO);
	}
}

// Resets game
function resetGame() {
	$("#gameModal").css("display", "block");
	TicTacToe.resetGame();
}
/*
BUGS:
-Cuando ganas en la ultima jugada en linea horizontal, sale empate pero suma el punto (?)
-Cuando juega P1 con X, desp reset y juega con O, desp reset y juega con X otra vez, no cambia.

TODO:
endGame maneja el modal, deberia hacerlo una funcion externa creo
*/
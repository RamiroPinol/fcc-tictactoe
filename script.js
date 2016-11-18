var TicTacToe = {
	board: [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ],
	firstPlayer: 1,
	currentPlayer: 1,
	moves: 0,
	pointsX: 0,
	pointsO: 0,
	winner: -1,

	//Changes player's turn
	changeTurn: function(player) {
		if (player == "current") {
			this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
		} else if (player == "first") {
			this.firstPlayer == 1 ? this.firstPlayer = 2 : this.firstPlayer = 1;
		}
	},

	//Place player's move on board and changes turn
	move: function(row, col) {
		var self = this;
		if (self.board[row][col] == 0) {
			self.board[row][col] = self.currentPlayer;
		}
		self.changeTurn("current");
		self.checkGame(self.board);

		// Debug
		self.debug();
	},

	debug: function() {
		console.log(this.board[0], this.board[1], this.board[2]);
		console.log("First player:", this.firstPlayer, "Current player: ", this.currentPlayer, "Moves: ", this.moves);
		console.log(this.pointsO, this.pointsX, this.winner);
	},

	playAgain: function() {
		this.board = [ [0,0,0], [0,0,0], [0,0,0] ];
		this.changeTurn("first");
		this.currentPlayer = this.firstPlayer;
		this.moves = 0;
		this.winner = -1;
	},

// Method to reset object. Create a new one should be the same.
/*
	reset: function() {
		this.playAgain();
		this.currentPlayer = 1;
		this.pointsX = 0;
		this.pointsO = 0;
	}
*/

	// Checks if a player as won the game
	checkGame: function(board) {
		var self = this;

		// Check for tic-tac-toe in row
		for (var i = 0; i < board.length; i++) {
			var equal = board[i][0] == board[i][1] && board[i][1] == board[i][2];

			if (equal && board[i].indexOf(1) != -1) {
				this.pointsX += 1;
    		return this.winner = 1;

    	} else if (equal && board[i].indexOf(2) != -1) {
				this.pointsO += 1;
    		return this.winner = 2;
	    }
		}

	  // Check for tic-tac-toe on column
	  for (var i = 0; i < board.length; i++) {

	    if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
	      if (board[0][i] == 1) {
					this.pointsX += 1;
	      	return this.winner = 1;

	      } else if (board[0][i] == 2) {
					this.pointsO += 1;
	      	return this.winner = 2;
	      }
	    }
	  }

	  // Check for cross tic-tac-toe
	  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
	      board[0][2] == board[1][1] && board[1][1] == board[2][0]) {

	    if (board[1][1] == 1) {
				this.pointsX += 1;
	    	return this.winner = 1;

	      } else if (board[1][1] == 2) {
					this.pointsO += 1;
	      	return this.winner = 2;
	      }
	  }

	  this.moves += 1;

	  if (this.moves == 9 && this.winner == undefined) {
			return this.winner = 0;
		}
	}
}

var game;

$(document).ready(function($) {

	// When user clicks on the button, open the modal
	$("#myBtn").click(function() {
	  $("#finishModal").css("display", "block");
	});


	// START GAME
	$(".btnStart").click(function() {
		//game = JSON.parse(JSON.stringify(TicTacToe));
		game = Object.create(TicTacToe);
		start();
		updatePoints();
		$("#gameModal").css("display", "none");
	});


	// PLAY AGAIN: When user clicks "Play again", new game starts
	$(".btnPlayAgain").click(function() {
		playAgain();
		$("#finishModal").css("display", "none");
	});


	// RESET: When click Reset button, creates a new TicTacToe object
	$(".btnReset").click(function() {
		clearBoard();
		$("#finishModal").css("display", "none");
		$("#gameModal").css("display", 'block');
	});


	// For every square, if empty, do move, print symbol and check for winner
	$("[class^='square']").each(function() {
		var square = $(this);

		square.click(function() {

			if (square.text() == "") {
				printSymbol(square);
				move(square.attr('class'));
				endGame(game.winner);

			}
		});
	})
});

function start() {
	/*
	if ($('[value="1player"]').is(':checked')) {
		//Aca hago lo que necesito para jugar vs pc
	}
	*/
	if ($('[value="square"]').is(':checked')) {
		$("#symbolP1").text("O");
		$("#symbolP2").text("X");
	}
}

function move(square) {
	switch (square) {
		case "square1":
			game.move(0,0);
			break;
		case "square2":
			game.move(0,1);
			break;
		case "square3":
			game.move(0,2);
			break;
		case "square4":
			game.move(1,0);
			break;
		case "square5":
			game.move(1,1);
			break;
		case "square6":
			game.move(1,2);
			break;
		case "square7":
			game.move(2,0);
			break;
		case "square8":
			game.move(2,1);
			break;
		case "square9":
			game.move(2,2);
			break;
	}
};

function printSymbol(square) {

	if (game.currentPlayer == 1) {
		square.html("X").fadeIn(600);
	} else {
		square.html("O").fadeIn(600);
	}
};

// Updates points in board based on player's symbol
function updatePoints() {
	if ($("#symbolP1").html() == "X") {
		$("#scoreP1").html(game.pointsX);
		$("#scoreP2").html(game.pointsO);
	} else {
		$("#scoreP2").html(game.pointsX);
		$("#scoreP1").html(game.pointsO);
	}
};

function clearBoard() {

	$("[class^='square']").each(function() {
	var square = $(this);
	square.text("");
	});
};

// Resets board
function playAgain() {

	updatePoints();

	clearBoard();

	game.playAgain();

};

function endGame(player) {

  if (player == 1) {
  	$("#finishText").html("X Wins!");
  	$("#finishModal").css("display", "block");

  } else if (player == 2) {
    $("#finishText").html("O Wins!");
    $("#finishModal").css("display", "block");

  } else if (player == 0) {
    $("#finishText").html("It's a tie...");
    $("#finishModal").css("display", "block");
  }
};

/*
BUGS:
-Cuando juega P1 con X, desp reset y juega con O, desp reset y juega con X otra vez, no cambia.
*/

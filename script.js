var TicTacToe = function() {
	this.board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
	this.firstPlayer = 1;
	this.currentPlayer = 1;
	this.pointsX = 0;
	this.pointsO = 0;

	// Changes player's turn
	this.changeTurn = function(player) {
		if (player == "current") {
			this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
		} else if (player == "first") {
			this.firstPlayer == 1 ? this.firstPlayer = 2 : this.firstPlayer = 1;
		}
	};

	// Place player's move on board and changes turn
	this.move = function(row, col) {
		var self = this;
		if (self.board[row][col] == 0) {
			self.board[row][col] = self.currentPlayer;
		}
		self.changeTurn("current");

		// Debug
		//self.debug();
	};

	this.debug = function() {
		console.log(this.board[0], this.board[1], this.board[2]);
		console.log("First player:", this.firstPlayer, "Current player: ", this.currentPlayer);
		console.log(this.pointsO, this.pointsX);
	};

	this.playAgain = function() {
		this.board = [ [0,0,0], [0,0,0], [0,0,0] ];
		this.changeTurn("first");
		this.currentPlayer = this.firstPlayer;
	};

	// Checks if a player as won the game
	this.checkGame = function(board) {
		var self = this;

		// Check for tic-tac-toe in row
		for (var i = 0; i < board.length; i++) {
			var equal = board[i][0] == board[i][1] && board[i][1] == board[i][2];

			if (equal && board[i].indexOf(1) != -1) {
				this.pointsX += 1;
    		return 1;

    	} else if (equal && board[i].indexOf(2) != -1) {
				this.pointsO += 1;
    		return 2;
	    }
		}

	  // Check for tic-tac-toe on column
	  for (var i = 0; i < board.length; i++) {

	    if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
	      if (board[0][i] == 1) {
					this.pointsX += 1;
	      	return 1;

	      } else if (board[0][i] == 2) {
					this.pointsO += 1;
	      	return 2;
	      }
	    }
	  }

	  // Check for cross tic-tac-toe
	  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
	      board[0][2] == board[1][1] && board[1][1] == board[2][0]) {

	    if (board[1][1] == 1) {
				this.pointsX += 1;
	    	return 1;

	      } else if (board[1][1] == 2) {
					this.pointsO += 1;
	      	return 2;
	      }
	  }

		// Flat array and check for tie (no empty cells)
		var flat = board.reduce( (a, b) => a.concat(b) );
	  if (flat.indexOf(0) == -1) {
			return 0;
		}

		// Return -1 (no winner yet) otherwise;
		return -1;

	};
};

var game,
	aiPlayer,
	aiStarts;

$(document).ready(function($) {

	$( 'input:radio[name=game]' ).change( function() {

		if ( this.value == "1player" ) {
			$("#p2").text("Human plays with...");

		} else {
			$("#p2").text("Player 1 plays with...");
		}
	});


	// START GAME
	$(".btnStart").click(function() {
		game = new TicTacToe();
		start();
		updatePoints();
		highligthTurn();

		aiPlayer = $('[value="circle"]').is(':checked') ? 1 : 2;
		aiStarts = game.firstPlayer == aiPlayer ? true : false;

		if ($('[value="1player"]').is(':checked')) {
			ai();
		}

		$("#gameModal").css("display", "none");
	});


	// PLAY AGAIN: When user clicks "Play again", new game starts
	$(".btnPlayAgain").click(function() {
		playAgain();

	//
	if ($('[value="1player"]').is(':checked')) {
		ai();
	}

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
				endGame(game.checkGame(game.board));

				// If 1 player game is selected, call AI
				if ($('[value="1player"]').is(':checked')) {
					ai();
				}

				// Add changing-color animation
				var squareClass = square.attr( 'class' );
				$("." + squareClass).addClass( "animateSquare" );
				setTimeout(function () {
					$("." + squareClass).removeClass( "animateSquare" );
				}, 1500);
			}

			highligthTurn();

		});
	});
});

function highligthTurn() {

	if (( $("#symbolP1").html() == "X" && game.currentPlayer == 1 ) ||
			( $("#symbolP1").html() == "O" && game.currentPlayer == 2 )) {
		$("#player1, #symbolP1, #scoreP1").addClass( "turnHighlight" );
		$("#player2, #symbolP2, #scoreP2").removeClass( "turnHighlight" );

	} else {
		$("#player2, #symbolP2, #scoreP2").addClass( "turnHighlight" );
		$("#player1, #symbolP1, #scoreP1").removeClass( "turnHighlight" );
	}
}

function start() {

	// Put corresponding symbol for each player on points info
	if ($('[value="circle"]').is(':checked')) {
		$("#symbolP1").text("O");
		$("#symbolP2").text("X");
	} else {
		$("#symbolP1").text("X");
		$("#symbolP2").text("O");
	}

	if ($('[value="1player"]').is(':checked')) {
		$("#player2").text("CPU");
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
		square.html("X");
	} else {
		square.html("O");
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

var state;

function ai() {
  state = $.extend(true, {}, game);
  var board = state.board;
  var myMove = state.currentPlayer == aiPlayer ? true : false;

  if (myMove) {
    makeMove();
  }

  function makeMove() {
    board = minimaxMove(board);
		aiClick(state.board, board);
    myMove = false;
  }

  function minimaxMove(board) {
    numNodes = 0;
		var player = state.currentPlayer == aiPlayer ? true : false;
		return recurseMinimax(board, player)[1];
  }

  var numNodes = 0;

  function recurseMinimax(board, player) {
    numNodes++;
		var winner = state.checkGame(board);

		if (winner != -1) {
      switch (winner) {
        case aiPlayer:
          // AI wins
          return [1, board]
				case 0:
					// Tie
					return [0, board];
        default:
          // opponent wins
          return [-1, board]
      }
    } else {
      // Next states
      var nextVal = null;
      var nextBoard = null;

			// for every game cell
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
					// if empty cell, make move in that cell
          if (board[i][j] == 0) {
            board[i][j] = player ? aiPlayer : aiPlayer == 1 ? 2 : 1; //!!!

						// recursive function value for the other player
            var value = recurseMinimax(board, !player)[0];
            if ((player && (nextVal == null || value > nextVal)) ||
							(!player && (nextVal == null || value < nextVal))) {
              nextBoard = board.map(function(arr) {
                return arr.slice();
              });
              nextVal = value;
            }
            board[i][j] = 0;
          }
        }
      }
      return [nextVal, nextBoard];
    }
  }
}

function aiClick(board, moveBoard) {

	// Returns the index of the element added by AI
	function arrayDiff(a, b) {
	  // Flat the arrays
	  var a = a.reduce( (a, b) => a.concat(b) );
	  var b = b.reduce( (a, b) => a.concat(b) );

	  for (var i = 0; i < a.length; i++) {
	    if (a[i] != b[i]) {
				return i;
	    }
	  }
	};
	setTimeout(function() {
		$(".square" + (arrayDiff(moveBoard, board) + 1)).click();
	}, 500);

};

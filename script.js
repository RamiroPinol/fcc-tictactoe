var TicTacToe = {
	board: [[0,0,0], [0,0,0], [0,0,0]],
	currentPlayer: 1,
	moves: 0,

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
	},

	debug: function() {
		console.log(this.board[0], this.board[1], this.board[2]);
		console.log("Player: ", this.currentPlayer, "Moves: ", this.moves);
	},

	clear: function() {
		this.board = [[0,0,0], [0,0,0], [0,0,0]];
		this.currentPlayer = 1;
		this.moves = 0;
	},

	// Checks if a player as won the game
	checkGame: function(board) {
		var self = this;

	  // Check for tic-tac-toe in row
	  board.forEach(function(current) {
	    var equal = current[0] == current[1] && current[1] == current[2];

	    if (equal && current.indexOf(1) != -1) {
	      return self.endGame("X");

	    } else if (equal && current.indexOf(2) != -1) {
	      return self.endGame("O");
	    }
	  })

	  // Check for tic-tac-toe on column
	  for (var i = 0; i < 3; i++) {

	    if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {

	      if (board[0][i] == 1) {
	        return this.endGame("X");

	      } else if (board[0][i] == 2) {
	        return this.endGame("O");
	      }
	    }
	  }

	  // Check for cross tic-tac-toe
	  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
	      board[0][2] == board[1][1] && board[1][1] == board[2][0]) {

	    if (board[1][1] == 1) {
	        return this.endGame("X");

	      } else if (board[1][1] == 2) {
	        return this.endGame("O");
	      }
	  }

	  // Checks if game is over in a tie
	  this.moves += 1;
	  if (this.moves == 9){
	  	return this.endGame("T");
	  }
	}, 

	endGame: function(symbol) {
	  if(symbol == "X") {
	    alert("X Wins");

	  } else if (symbol == "O") {
	    alert("O Wins");

	  } else if (symbol == "T"){
	    alert("It's a tie!");
	  }
	  newGame();
	}
}

$(document).ready(function($) {

	// When the user clicks on the button, open the modal
	$("#myBtn").click(function() {
	    $("#myModal").css("display", "block");
	});

	// When the user clicks on <span> (x), close the modal
	$(".close").click(function() {
	    $("#myModal").css("display", "none");
	});

	// When the user clicks anywhere outside of the modal, close it
	$("body").click(function(event) {
		var target = $(event.target);
    if (target.is("#myModal")) {
      $("#myModal").css("display", "none");
    };
	});

	//$("#gameModal").css("display", "block");
	

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
		//TicTacToe.currentPlayer = 2;
		$("#symbolP1").text("O");
		$("#symbolP2").text("X");
	}
	
}
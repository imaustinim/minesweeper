const gameboard = document.querySelector("#gameboard");
const boardWidth = document.querySelector("#board-width");
const boardHeight = document.querySelector("#board-height");
const bombs = document.querySelector("#bombs-amount");
class Board {
    constructor(width, height, bombs, board) {
        this.width = width;
        this.height = height;
        this.bombs = bombs;
        this.board = board;
        this.boardArray = [];
    }

    deleteboard() {
        while (this.board.hasChildNodes()) {
            this.board.removeChild(this.board.lastChild);
        }
    }

    createBoard() {
        for (let i = 0; i < this.width.value; i++) {
            const row = document.createElement("div");
            const rArr = [];
            row.className = "row";
            this.board.appendChild(row);
            for (let j = 0; j < this.height.value; j++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.innerHTML = [i,j];
                row.appendChild(cell);
                rArr.push(cell);
            }
            this.boardArray.push(rArr);
        }
    }

    populateBoard() {
    }
}


// main code
const board = new Board(boardWidth, boardHeight, bombs, gameboard);
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", function() {
    board.deleteboard();
    board.createBoard();
});

// Pseudo Code
// Initialize and cache game items (board, buttons, settings)
// Add event listener for new game based upon settings
    // Create dynamic algorithm using board width, height, difficulty, and style
// Create win conditions algorithm
// Build event listeners
// Display result and new game buttons

// -- Recommendations --
// Start small
// Think recursive functions
// How to do the flood mechanic

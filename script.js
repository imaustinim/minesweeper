const gameboard = document.querySelector("#gameboard");
const boardWidth = document.querySelector("#board-width");
const boardHeight = document.querySelector("#board-height");
const bombs = document.querySelector("#bombs-amount");
class Board {
    constructor(width, height, bombs, location) {
        this.width = width;
        this.height = height;
        this.bombs = bombs
        this.location = location
    }

    createBoard() {
        console.log("hi");
        const loc = this.location;
        console.log(loc);
        for (let i = 0; i < self.width; i++) {
            const row = document.createElement("div");
            // for (let j = 0; j < self.height; j++) {
            
        }
        console.log("HI")
    }
}

const board = new Board(boardWidth, boardHeight, bombs, gameboard);

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", function() {
    board.createBoard();
});

// Pseudo Code
// Initialize and cache game items (board, buttons, settings)
// Add event listener for new game based upon settings
    // Create dynamic algorithm using board width, height, difficulty, and style
// Create win conditions algorithm
// Build event listeners
// Display result and new game buttons
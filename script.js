class Board {
    constructor() {
        this.board = document.querySelector("#gameboard");
        this.width = document.querySelector("#board-width").value;
        this.height = document.querySelector("#board-height").value;
        this.bombs = document.querySelector("#board-bombs").value;
        this.gameType = document.querySelector("#gameType").value;
        this.boardArray = [];
        this.activeCells = [];
        this.bombCounter = document.querySelector("#bomb-counter");
        this.minutes = document.querySelector("#minutes");
        this.seconds = document.querySelector("#seconds");
        this.timer = null
    }

    deleteboard() {
        while (this.board.hasChildNodes()) {
            this.board.removeChild(this.board.lastChild);
        }
        this.boardArray = [];
        clearInterval(this.timer);
    }

    createBoard() {
        for (let i = 0; i < this.width; i++) {
            const row = document.createElement("div");
            const rowArray = [];
            row.className = "row";
            this.board.appendChild(row);
            for (let j = 0; j < this.height; j++) {
                const div = document.createElement("div");
                div.className = "cell";
                row.appendChild(div);
                const cell = document.createElement("img");
                div.appendChild(cell);
                cell.src = `img/${this.gameType}/0.png`;
                cell.className = "cell-img";
                cell.classList.add("active-cell");
                rowArray.push({
                    "element" : cell,
                    "value" : 0,
                    "temp_value" : 9,
                    "x_value" : i,
                    "y_value" : j,
                })
            }
            this.boardArray.push(rowArray);
        }
    }

    populateBoard() {
        const createBombs = () => {
            let x = Math.round(Math.random()*(this.width-1));
            let y = Math.round(Math.random()*(this.height-1));
            const cell = this.boardArray[x][y];
            if (cell.value === 0) {
                cell.value = -2;
            } else {
                createBombs();
            }
        }
            
        const addNumbers = (e) => {
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    const cell = this.boardArray[x][y];
                    if (cell.value === -2) {
                        for (let i = x-1; i <= x+1; i++) {
                            for (let j = y-1; j <= y+1; j++) {
                                if (i >= this.width || j >= this.height || i < 0 || j < 0) continue;
                                const adjCell = this.boardArray[i][j];
                                if (adjCell.value >= 0) {
                                    adjCell.value += 1;
                                };
                            }
                        }
                    }
                }
            }
        }

        function setTime() {
            ++totalSeconds;
            this.seconds.innerHTML = pad(totalSeconds % 60);
            this.minutes.innerHTML = pad(parseInt(totalSeconds / 60));
        
            function pad(val) {
                const valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
        }
        
        let num1 = this.bombs/100*this.width*this.height;
        let num2 = this.width*this.height-1;
        let numBombs = Math.ceil(Math.min(num1, num2));
        this.bombCounter.innerHTML = numBombs;
        while (numBombs > 0) {
            createBombs();
            numBombs--;
        }
        addNumbers();
        this.activeCells = [].slice.call(document.querySelectorAll(".active-cell"), 0);
        let totalSeconds = 0;
        this.timer = setInterval(setTime, 1000);
    }
        
    clickEventListener = (item) => {
        item.addEventListener("click", (e) => {
            const node = e.target.parentNode;
            const x = this.getIndex(node, 0);
            const y = this.getIndex(node, 1);
            const cell = this.boardArray[x][y];
            this.evaluateCell(cell, x, y);
        }
    )};

    evaluateCell(cell, x, y) {
        if (cell.value === 0) {
            cell.value = -1;
            for (let i = x-1; i <= x+1; i++) {
                for (let j = y-1; j <= y+1; j++) {
                    if (i >= this.width || j >= this.height || i < 0 || j < 0) continue;
                    const adjCell = this.boardArray[i][j];
                    if (adjCell === cell) continue;
                    if (adjCell.value === 0) {
                        this.evaluateCell(adjCell, i, j);
                    } else if (adjCell.value > 0 && adjCell.value < 9) {
                        this.changeCellImage(adjCell);                        
                    }
                }
            }
        }
        this.changeCellImage(cell);
    }
    
    changeCellImage(cell) {
        const index = this.activeCells.indexOf(cell.element);
        if (index != -1) {
            // const isBomb = () => {
            //     if (cell.value === -2) {
            //         cell.element.style.color = "red";
            //     }
            // } 
            cell.element.src = `img/${this.gameType}/${cell.value}.png`;
            cell.element.classList.remove("active-cell");
            this.activeCells.splice(index, 1);
        }
    }

    rightClickEventListener = (item) => {
        item.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            const node = e.target.parentNode;
            const x = this.getIndex(node, 0);
            const y = this.getIndex(node, 1);
            const cell = this.boardArray[x][y];
            if (this.activeCells.indexOf(cell.element) >= 0) {
                if (cell.element.classList.contains("active-cell")) {
                    if (cell.value !== -9) {
                        const t = cell.value;
                        cell.value = cell.temp_value;
                        cell.temp_value = t;
                        cell.element.src = `img/${this.gameType}/${cell.value}.png`;
                        cell.element.classList.remove("active-cell");
                        this.bombCounter.innerHTML = parseInt(this.bombCounter.innerHTML)-1;
                    }
                } else {
                    const t = cell.value;
                    cell.value = cell.temp_value;
                    cell.temp_value = t;
                    cell.element.src = `img/${this.gameType}/0.png`;
                    cell.element.classList.add("active-cell");
                    this.bombCounter.innerHTML = parseInt(this.bombCounter.innerHTML)+1;
                }
                if (this.bombCounter.innerHTML == 0) this.evaluateGame();
            }
        })
    }

    evaluateGame() {
        let b = 0;
        this.activeCells.forEach(node => {
            const x = this.getIndex(node, 0);
            const y = this.getIndex(node, 1);
            const cell = this.boardArray[x][y];
            if (cell.value === 9) {
                b += 1;
            }
        })
        if (b === 0) {
            // win game
        } else {
            // lose game
        }
    }

    getIndex(node, axis) {
        if (!axis) {
            return this.boardArray.indexOf.call(node.parentNode.parentNode.childNodes, node.parentNode);
        } else {
            return this.boardArray.indexOf.call(node.parentNode.childNodes, node);
        }
    }

    getChanges() {
        this.width = document.querySelector("#board-width").value;
        this.height = document.querySelector("#board-height").value;
        this.bombs = document.querySelector("#board-bombs").value;
        this.gameType = document.querySelector("#gameType").value;
    }
}

// __main__
const board = new Board();
const newGame = document.querySelector("#start-button");
newGame.addEventListener("click", (e) => {
    e.preventDefault();
    board.deleteboard();
    board.getChanges();
    board.createBoard();
    board.populateBoard();
    board.activeCells.forEach(item => board.clickEventListener(item));
    board.activeCells.forEach(item => board.rightClickEventListener(item));
});

const settingsBtn = document.querySelector("#settings-button");
const modalBg = document.querySelector(".modal-bg");
const saveBtn = document.querySelector("#save-changes");

settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modalBg.classList.add("modal-bg-active");
})

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    board.getChanges();
    modalBg.classList.remove("modal-bg-active");
})

const width = document.querySelector("#board-width");
const height = document.querySelector("#board-height");
const bombs = document.querySelector("#board-bombs");
const gameType = document.querySelector("#gameType")
const settings = [width, height, bombs, gameType];
settings.forEach(item => changeSettings(item));

function changeSettings(item) {
    item.addEventListener("click", (e) => {
        const childNodes = e.target.parentNode.childNodes;
        childNodes[childNodes.length-2].innerHTML = e.target.value;
        // const text = document.qu
        // document.querySelector("#width-value").innerHTML = "aksjdflajsdf";
        // console.log(e.target.nextSibling.innerHTML);
    })
};




// Add win condition - if all values are > 1 or -3
// Add lose condition - if clicked value is -2
    // Add background color and pop up
// Add counter
// Add settings page
    // Save settings
    // Add different styles
// Add media query
class Board {
  gameBoard = [null, null, null, null, null, null, null, null, null];

  placeAt(player, index) {
    this.gameBoard[index] = player.sign;
  }
  isEmpty(index) {
    return this.gameBoard[index] === null;
  }
  getSign(index) {
    return this.gameBoard[index];
  }

  isFull() {
    return !this.gameBoard.includes(null);
  }

  reset() {
    this.gameBoard = [null, null, null, null, null, null, null, null, null];
  }
}

class DisplayController {
  init() {
    this.updateMessage();
    const grid = document.querySelector(".grid");
    grid.replaceChildren();
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.addEventListener("click", this.validateMove);
      square.classList.add("square");
      square.setAttribute("data-index", i);
      grid.appendChild(square);
    }
  }

  updateBoard(player, index) {
    const square = document.querySelector(`[data-index="${index}"]`);
    square.textContent = player.sign;
  }

  displayResults(winner) {
    let result = "";
    if (winner === "draw") {
      result = "It's a draw!";
    } else {
      result = `${winner} wins!`;
    }
    this.disableBoard();
    const announcement = document.querySelector(".announcement");
    announcement.textContent = result;
    setTimeout(() => {
      this.init();
    }, 2000);
  }

  disableBoard() {
    const grid = document.querySelectorAll(".square");
    grid.forEach((square) =>
      square.removeEventListener("click", this.validateMove)
    );
  }

  validateMove(event) {
    game.validateMove(event.target.getAttribute("data-index"));
  }

  updateMessage() {
    const announcement = document.querySelector(".announcement");
    announcement.textContent = `${game.getCurrentPlayer().name}, your turn`;
  }
}

class Player {
  constructor(sign, name) {
    this.sign = sign;
    this.name = name;
  }
}

class Game {
  board = new Board();
  playerA = new Player("O", "Player A");
  playerB = new Player("X", "Player B");
  displayController = new DisplayController();

  nextTurn = false;

  getCurrentPlayer() {
    return this.nextTurn ? this.playerA : this.playerB;
  }

  reset() {
    this.nextTurn = false;
    this.board.reset();
  }

  start() {
    this.displayController.init();
  }

  validateMove(index) {
    if (this.board.isEmpty(index)) {
      this.updateMove(index);
    }
  }

  updateMove(index) {
    this.board.placeAt(this.getCurrentPlayer(), index);
    this.displayController.updateBoard(this.getCurrentPlayer(), index);
    if (this.isWinningMove(index)) {
      this.displayController.displayResults(this.getCurrentPlayer().name);
      setTimeout(() => {
        this.reset();
      }, 2000);
      return;
    }
    if (this.isDraw()) {
      console.log("draw");
      this.displayController.displayResults("draw");
      setTimeout(() => {
        this.reset();
      }, 2000);
      return;
    }
    this.nextTurn = !this.nextTurn;
    this.displayController.updateMessage();
  }

  winningConditions = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  isWinningMove(index) {
    // checks for which array contains index, and checks if all indices in array have the same sign
    const possibleWins = this.winningConditions.filter((condition) => {
      return condition.includes(Number(index));
    });

    for (let condition of possibleWins) {
      if (
        condition.every(
          (pos) => this.board.getSign(pos) === this.getCurrentPlayer().sign
        )
      )
        return true;
    }
    return false;
  }

  isDraw() {
    return this.board.isFull();
  }
}

const game = new Game();
game.start();

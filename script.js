const board = (() => {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  const placeAt = (player, index) => {
    gameBoard[index] = player.sign;
  };
  const isEmpty = (index) => {
    return gameBoard[index] === null;
  };
  const getSign = (index) => {
    return gameBoard[index];
  };

  const isFull = () => {
    return !gameBoard.includes(null);
  };

  return { placeAt, isEmpty, getSign, isFull };
})();

const player = (sign, name) => {
  return { sign, name };
};

const game = (() => {
  const playerA = player("O", "Player A");
  const playerB = player("X", "Player B");

  let nextTurn = false;

  const getCurrentPlayer = () => {
    return nextTurn ? playerA : playerB;
  };

  const getNextPlayer = () => {
    return nextTurn ? playerB : playerA;
  };

  const start = () => {
    displayController.init();
  };

  const validateMove = (index) => {
    if (board.isEmpty(index)) {
      updateMove(index);
    }
  };

  const updateMove = (index) => {
    board.placeAt(getCurrentPlayer(), index);
    displayController.updateBoard(getCurrentPlayer(), index);
    if (isWinningMove(index)) {
      displayController.displayResults(getCurrentPlayer().name);
    }
    if (isDraw()) {
      console.log("draw");
      displayController.displayResults("draw");
    }
    nextTurn = !nextTurn;
  };

  const winningConditions = [
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

  const isWinningMove = (index) => {
    // checks for which array contains index, and checks if all indices in array have the same sign
    const possibleWins = winningConditions.filter((condition) => {
      return condition.includes(Number(index));
    });

    for (let condition of possibleWins) {
      if (
        condition.every((pos) => board.getSign(pos) === getCurrentPlayer().sign)
      )
        return true;
    }
    return false;
  };

  const isDraw = () => {
    return board.isFull();
  };

  return { start, validateMove };
})();

const displayController = (() => {
  const init = () => {
    const board = displayBoard();
  };

  const updateBoard = (player, index) => {
    const square = document.querySelector(`[data-index="${index}"]`);
    square.textContent = player.sign;
  };

  const displayResults = (winner) => {};
  const displayBoard = () => {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.addEventListener("click", (event) => {
        game.validateMove(event.target.getAttribute("data-index"));
      });
      square.classList.add("square");
      square.setAttribute("data-index", i);
      grid.appendChild(square);
    }
  };
  return { init, updateBoard };
})();

game.start();

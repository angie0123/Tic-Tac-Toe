const board = (() => {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  const placeAt = (player, index) => {
    gameBoard[index] = player.sign;
    console.log(gameBoard);
  };
  const isEmpty = (index) => {
    return gameBoard[index] === null;
  };
  return { placeAt, isEmpty };
})();

const player = (sign) => {
  return { sign };
};

const game = (() => {
  const playerA = player("O");
  const playerB = player("X");

  let nextTurn = false;

  const getCurrentPlayer = () => {
    return nextTurn ? playerB : playerA;
  };
  const nextPlayer = (nextTurn) => {
    return nextTurn ? playerA : playerB;
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
    nextTurn = !nextTurn;
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

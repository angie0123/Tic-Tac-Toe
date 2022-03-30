const board = (() => {
  const gameBoard = [];
  const placeAt = (player, index) => {
    gameBoard[index] = player.sign;
    console.log(gameBoard);
  };
  return { placeAt };
})();

const player = (sign) => {
  return { sign };
};

const playerA = player("O");
const playerB = player("X");

const game = (() => {
  const start = () => {
    displayController.init();
  };
  return { start };
})();

const displayController = (() => {
  const init = () => {
    const board = displayBoard();
  };

  const displayBoard = () => {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.addEventListener("click", () => {
        console.log("clicked!");
      });
      square.classList.add("square");
      square.setAttribute("data-index", i);
      grid.appendChild(square);
    }
  };
  return { init };
})();

game.start();

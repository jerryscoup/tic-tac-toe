const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick() {
  const cellIndex = Array.from(cells).indexOf(this);

  if (board[cellIndex] !== "" || !isGameActive) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "text-blue-500" : "text-red-500");
}

function checkWinner() {
  let roundWon = false;
  let winningCells = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCells = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    highlightWinningCells(winningCells);
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add("bg-green-400", "animate-bounce");
  });
}

function resetGame() {
  board.fill("");
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("text-blue-500", "text-red-500", "bg-green-400", "animate-bounce");
  });
  statusText.textContent = "It's X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
statusText.textContent = "It's X's turn";

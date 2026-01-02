const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

/* Disable reset at start */
resetBtn.disabled = true;

const winningPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    statusText.innerHTML = `Player <span>${currentPlayer}</span> wins 🎉`;
    gameActive = false;
    resetBtn.disabled = false;   // enable reset
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    resetBtn.disabled = false;   // enable reset
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerHTML = `Player <span>${currentPlayer}</span>'s turn`;
}

function checkWin() {
  return winningPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  resetBtn.disabled = true;

  statusText.innerHTML = `Player <span>X</span>'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

/* Event listeners */
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

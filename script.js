const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameover = false;

// Function to change player turn
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check winning condition
function checkWin() {
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

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent &&
      cells[a].textContent !== ""
    ) {
      gameover = true;
      message.textContent = `Player ${currentPlayer} wins!`;
      break;
    }
  }

  if (!gameover && Array.from(cells).every(cell => cell.textContent !== "")) {
    gameover = true;
    message.textContent = "Game is a tie!";
  }
}

// Function to handle cell click event
function handleClick(event) {
  if (!gameover && event.target.textContent === "") {
    event.target.textContent = currentPlayer;
    checkWin();
    changePlayer();
  }
}

// Function to reset the game
function resetGame() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  currentPlayer = "X";
  gameover = false;
  message.textContent = "";
}

// Add event listener to each cell
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

// Add event listener to reset button
resetBtn.addEventListener("click", resetGame);

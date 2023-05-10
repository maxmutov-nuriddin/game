const gameElement = document.getElementById("game");
const resetButton = document.getElementById("reset");

const ROWS = 10;
const COLS = 10;
const MINES = 10;

let board = [];
let gameOver = false;

function initBoard() {
  board = [];
  for (let row = 0; row < ROWS; row++) {
    board.push([]);
    for (let col = 0; col < COLS; col++) {
      board[row].push({
        hasMine: false,
        revealed: false,
        flagged: false,
        neighborCount: 0,
      });
    }
  }
}

function placeMines() {
  let minesToPlace = MINES;
  while (minesToPlace > 0) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      minesToPlace--;
    }
  }
}

function countNeighbors(row, col) {
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  for (const offset of offsets) {
    const neighborRow = row + offset[0];
    const neighborCol = col + offset[1];
    if (
      neighborRow >= 0 &&
      neighborRow < ROWS &&
      neighborCol >= 0 &&
      neighborCol < COLS &&
      board[neighborRow][neighborCol].hasMine
    ) {
      count++;
    }
  }
  return count;
}

function countAllNeighbors() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      board[row][col].neighborCount = countNeighbors(row, col);
    }
  }
}

function revealCell(row, col) {
  if (gameOver) {
    return;
  }
  const cell = board[row][col];
  if (cell.revealed || cell.flagged) {
    return;
  }
  cell.revealed = true;
  if (cell.hasMine) {
    gameOver = true;
    revealAllMines();
    alert("Вы проиграли!");
    return;
  }
  if (cell.neighborCount === 0) {
    revealNeighbors(row, col);
  }
  if (checkWin()) {
    gameOver = true;
    alert("Вы победили!");
    return;
  }
}

function revealNeighbors(row, col) {
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (const offset of offsets) {
    const neighborRow = row + offset[0];
    const neighborCol = col + offset[1];
    if (
      neighborRow >= 0 &&
      neighborRow < ROWS &&
      neighborCol >= 0 &&
      neighborCol < COLS
    ) {
      revealCell(neighborRow, neighborCol);
    }
  }
}

function revealAllMines() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col].hasMine) {
        board[row][col].revealed = true;
      }
    }
  }
}

function toggleFlag(row, col) {
  if (gameOver) {
    return;
  }
  const cell = board[row][col];
  if (cell.revealed) {
    return;
  }
  cell.flagged = !cell.flagged;
}

function checkWin() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      if (!cell.hasMine && !cell.revealed) {
        return false;
      }
    }
  }
  return true;
}

function render() {
  gameElement.innerHTML = "";
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (!cell.revealed) {
        cellElement.classList.add("hidden");
        if (cell.flagged) {
          cellElement.classList.add("flag");
        }
      } else {
        if (cell.hasMine) {
          cellElement.classList.add("mine");
        } else {
          cellElement.classList.add("number" + cell.neighborCount);
        }
      }
      cellElement.addEventListener("click", () => {
        revealCell(row, col);
        render();
      });
      cellElement.addEventListener("contextmenu", event => {
        event.preventDefault();
        toggleFlag(row, col);
        render();
      });
      gameElement.appendChild(cellElement);
    }
    gameElement.appendChild(document.createElement("br"));
  }
}

function reset() {
  initBoard();
  placeMines();
  countAllNeighbors();
  gameOver = false;
  render();
}

resetButton.addEventListener("click", reset);

reset();
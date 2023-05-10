const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultElement = document.getElementById("result");

function computerPlay() {
  const gestures = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * gestures.length);
  return gestures[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "Ничья!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "Вы победили!";
  } else {
    return "Компьютер победил!";
  }
}

rockButton.addEventListener("click", () => {
  const computerSelection = computerPlay();
  const result = playRound("rock", computerSelection);
  resultElement.textContent = result;
});

paperButton.addEventListener("click", () => {
  const computerSelection = computerPlay();
  const result = playRound("paper", computerSelection);
  resultElement.textContent = result;
});

scissorsButton.addEventListener("click", () => {
  const computerSelection = computerPlay();
  const result = playRound("scissors", computerSelection);
  resultElement.textContent = result;
});
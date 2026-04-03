//This file manages the main menu of the chess game, it displays the current scores for both players and provides a button to start a new game. It retrieves the scores from session storage and updates the display accordingly, allowing players to keep track of their wins across multiple games.
const startGameBtn = document.getElementById("start-game-btn");

const whiteWins = sessionStorage.getItem("whiteWins") || 0;
const blackWins = sessionStorage.getItem("blackWins") || 0;

document.getElementById("white-score").textContent = whiteWins;
document.getElementById("black-score").textContent = blackWins;

startGameBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
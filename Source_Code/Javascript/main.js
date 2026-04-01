const startGameBtn = document.getElementById("start-game-btn");

const whiteWins = sessionStorage.getItem("whiteWins") || 0;
const blackWins = sessionStorage.getItem("blackWins") || 0;

document.getElementById("white-score").textContent = whiteWins;
document.getElementById("black-score").textContent = blackWins;

startGameBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
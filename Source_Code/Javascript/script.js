const chessboard = document.getElementById("chessboard");
const game = new Game();

const restartBtn = document.getElementById("restart-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const modalMenuBtn = document.getElementById("modal-menu-btn");

const capturedWhiteContainer = document.getElementById("captured-white");
const capturedBlackContainer = document.getElementById("captured-black");
const moveHistoryContainer = document.getElementById("move-history");

const checkmateModal = document.getElementById("checkmate-modal");
const checkmateTitle = document.getElementById("checkmate-title");
const checkmateMessage = document.getElementById("checkmate-message");

const whitePanel = document.getElementById("white-panel");
const blackPanel = document.getElementById("black-panel");

restartBtn.addEventListener("click", () => {
    game.resetGame();
    checkmateModal.classList.add("hidden");
    clearHighlights();
    updateBoard();
});

playAgainBtn.addEventListener("click", () => {
    checkmateModal.classList.add("hidden");
    game.resetGame();
    clearHighlights();
    updateBoard();
});

mainMenuBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

modalMenuBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

function renderMoveHistory() {
    moveHistoryContainer.innerHTML = "";

    game.moveHistory.forEach((move, index) => {
        const moveElement = document.createElement("div");
        moveElement.textContent = `${index + 1}. ${move}`;
        moveHistoryContainer.appendChild(moveElement);
    });
}

function renderTurnIndicator() {
    whitePanel.classList.remove("active-turn");
    blackPanel.classList.remove("active-turn");

    if (game.currentTurn === "white") {
        whitePanel.classList.add("active-turn");
    } else {
        blackPanel.classList.add("active-turn");
    }
}

function renderCapturedPieces() {
    capturedWhiteContainer.innerHTML = "";
    capturedBlackContainer.innerHTML = "";

    game.capturedWhitePieces.forEach(piece => {
        const img = document.createElement("img");
        img.src = piece.image;
        img.alt = piece.name;
        img.classList.add("captured-piece-image");
        capturedWhiteContainer.appendChild(img);
    });

    game.capturedBlackPieces.forEach(piece => {
        const img = document.createElement("img");
        img.src = piece.image;
        img.alt = piece.name;
        img.classList.add("captured-piece-image");
        capturedBlackContainer.appendChild(img);
    });
}

function generateBoard() {
    chessboard.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");

            if ((row + col) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }

            square.dataset.row = row;
            square.dataset.col = col;
            square.id = `square-${row}-${col}`;

            square.addEventListener("click", handleSquareClick);

            chessboard.appendChild(square);
        }
    }
}

function renderPieces() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.getElementById(`square-${row}-${col}`);
            square.innerHTML = "";

            const piece = game.getPiece(row, col);
            if (piece) {
                const img = document.createElement("img");
                img.src = piece.image;
                img.alt = piece.name;
                img.classList.add("piece-image");
                square.appendChild(img);
            }
        }
    }
}

function clearHighlights() {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.remove("highlight");
        square.classList.remove("selected");
    });
}

function highlightMoves(moves) {
    for (const move of moves) {
        const square = document.getElementById(`square-${move.row}-${move.col}`);
        square.classList.add("highlight");
    }
}

function handleSquareClick(event) {
    if (game.gameOver) return;

    const squareElement = event.currentTarget;
    const row = parseInt(squareElement.dataset.row);
    const col = parseInt(squareElement.dataset.col);
    const clickedPiece = game.getPiece(row, col);

    if (game.selectedPiece) {
        const selected = game.selectedPiece;
        const validMoves = game.validMoves;

        const isValidMove = validMoves.some(move => move.row === row && move.col === col);

        if (isValidMove) {
            game.movePiece(selected.row, selected.col, row, col);
            game.selectedPiece = null;
            game.validMoves = [];
            game.switchTurn();

            const currentPlayer = game.currentTurn;

            if (game.isCheckmate(currentPlayer)) {
                if (currentPlayer === "white") {
                    checkmateTitle.textContent = "Checkmate!";
                    checkmateMessage.textContent = "Black wins the game.";

                    let blackWins = parseInt(sessionStorage.getItem("blackWins") || "0");
                    blackWins++;
                    sessionStorage.setItem("blackWins", blackWins);
                } else {
                    checkmateTitle.textContent = "Checkmate!";
                    checkmateMessage.textContent = "White wins the game.";

                    let whiteWins = parseInt(sessionStorage.getItem("whiteWins") || "0");
                    whiteWins++;
                    sessionStorage.setItem("whiteWins", whiteWins);
                }

                checkmateModal.classList.remove("hidden");
                game.gameOver = true;
                updateBoard();
                return;
            }

            updateBoard();
            return;
        }
    }

    if (clickedPiece && clickedPiece.color === game.currentTurn) {
        game.selectedPiece = clickedPiece;
        game.validMoves = game.getLegalMoves(clickedPiece);

        clearHighlights();
        document.getElementById(`square-${row}-${col}`).classList.add("selected");
        highlightMoves(game.validMoves);
    }
}

function updateBoard() {
    clearHighlights();
    renderPieces();
    renderCapturedPieces();
    renderMoveHistory();
    renderTurnIndicator();
}

generateBoard();
updateBoard();
const chessboard = document.getElementById("chessboard");
const game = new Game();

const restartBtn = document.getElementById("restart-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");
const muteBtn = document.getElementById("mute-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const modalMenuBtn = document.getElementById("modal-menu-btn");

const confirmRestartBtn = document.getElementById("confirm-restart-btn");
const cancelRestartBtn = document.getElementById("cancel-restart-btn");

const capturedWhiteContainer = document.getElementById("captured-white");
const capturedBlackContainer = document.getElementById("captured-black");
const moveHistoryContainer = document.getElementById("move-history");

const checkmateModal = document.getElementById("checkmate-modal");
const restartModal = document.getElementById("restart-modal");

const checkmateTitle = document.getElementById("checkmate-title");
const checkmateMessage = document.getElementById("checkmate-message");
const winnerIcon = document.getElementById("winner-icon");

const whitePanel = document.getElementById("white-panel");
const blackPanel = document.getElementById("black-panel");

const bgMusic = document.getElementById("bg-music");
const moveSound = document.getElementById("move-sound");
const captureSound = document.getElementById("capture-sound");
const winSound = document.getElementById("win-sound");

let isMusicMuted = false;
let musicStarted = false;

function playSound(audioElement) {
    if (!audioElement) return;
    audioElement.currentTime = 0;
    audioElement.play().catch(() => {});
}

function startBackgroundMusic() {
    if (!bgMusic || musicStarted || isMusicMuted) return;

    bgMusic.volume = 0.25;
    bgMusic.play()
        .then(() => {
            musicStarted = true;
        })
        .catch(() => {});
}

function updateMuteButton() {
    if (!muteBtn) return;
    muteBtn.textContent = isMusicMuted ? "Unmute Music" : "Mute Music";
}

function flashCaptureSquare(row, col) {
    const square = document.getElementById(`square-${row}-${col}`);
    if (!square) return;

    square.classList.add("capture-flash");
    setTimeout(() => {
        square.classList.remove("capture-flash");
    }, 280);
}

document.addEventListener("click", startBackgroundMusic, { once: true });

restartBtn.addEventListener("click", () => {
    restartModal.classList.remove("hidden");
});

confirmRestartBtn.addEventListener("click", () => {
    restartModal.classList.add("hidden");
    checkmateModal.classList.add("hidden");
    game.resetGame();
    clearHighlights();
    updateBoard();

    if (bgMusic && !isMusicMuted) {
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }
});

cancelRestartBtn.addEventListener("click", () => {
    restartModal.classList.add("hidden");
});

playAgainBtn.addEventListener("click", () => {
    checkmateModal.classList.add("hidden");
    game.resetGame();
    clearHighlights();
    updateBoard();

    if (bgMusic && !isMusicMuted) {
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }
});

mainMenuBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

modalMenuBtn.addEventListener("click", () => {
    window.location.href = "main.html";
});

muteBtn.addEventListener("click", () => {
    isMusicMuted = !isMusicMuted;

    if (bgMusic) {
        bgMusic.muted = isMusicMuted;

        if (!isMusicMuted) {
            bgMusic.play().catch(() => {});
            musicStarted = true;
        }
    }

    updateMuteButton();
});

function renderMoveHistory() {
    moveHistoryContainer.innerHTML = "";

    for (let i = 0; i < game.moveHistory.length; i += 2) {
        const row = document.createElement("div");
        row.classList.add("history-row");

        const moveNumber = document.createElement("span");
        moveNumber.classList.add("history-move-number");
        moveNumber.textContent = `${Math.floor(i / 2) + 1}.`;

        const whiteMove = document.createElement("span");
        whiteMove.classList.add("history-move");
        whiteMove.textContent = game.moveHistory[i] || "";

        const blackMove = document.createElement("span");
        blackMove.classList.add("history-move");
        blackMove.textContent = game.moveHistory[i + 1] || "";

        row.appendChild(moveNumber);
        row.appendChild(whiteMove);
        row.appendChild(blackMove);

        moveHistoryContainer.appendChild(row);
    }
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
        if (piece.image) {
            const img = document.createElement("img");
            img.src = piece.image;
            img.alt = piece.name;
            img.classList.add("captured-piece-image");
            capturedWhiteContainer.appendChild(img);
        } else {
            const span = document.createElement("span");
            span.textContent = piece.symbol;
            capturedWhiteContainer.appendChild(span);
        }
    });

    game.capturedBlackPieces.forEach(piece => {
        if (piece.image) {
            const img = document.createElement("img");
            img.src = piece.image;
            img.alt = piece.name;
            img.classList.add("captured-piece-image");
            capturedBlackContainer.appendChild(img);
        } else {
            const span = document.createElement("span");
            span.textContent = piece.symbol;
            capturedBlackContainer.appendChild(span);
        }
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
                if (piece.image) {
                    const img = document.createElement("img");
                    img.src = piece.image;
                    img.alt = piece.name;
                    img.classList.add("piece-image");
                    square.appendChild(img);
                } else {
                    square.textContent = piece.symbol;
                }
            }
        }
    }
}

function renderCheckState() {
    document.querySelectorAll(".square").forEach(square => {
        square.classList.remove("king-in-check");
    });

    if (game.isKingInCheck("white")) {
        const whiteKing = game.findKing("white");
        if (whiteKing) {
            const square = document.getElementById(`square-${whiteKing.row}-${whiteKing.col}`);
            square.classList.add("king-in-check");
        }
    }

    if (game.isKingInCheck("black")) {
        const blackKing = game.findKing("black");
        if (blackKing) {
            const square = document.getElementById(`square-${blackKing.row}-${blackKing.col}`);
            square.classList.add("king-in-check");
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

async function handleSquareClick(event) {
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
            const targetPiece = game.getPiece(row, col);
            const movingPieceImage = selected.image;

            clearHighlights();

            if (targetPiece) {
                playSound(captureSound);
                await animateCapturePiece(row, col, targetPiece.image);
            } else {
                playSound(moveSound);
            }

            await animateMovePiece(selected.row, selected.col, row, col, movingPieceImage);

            game.movePiece(selected.row, selected.col, row, col);
            game.selectedPiece = null;
            game.validMoves = [];
            game.switchTurn();

            const currentPlayer = game.currentTurn;

            if (game.isCheckmate(currentPlayer)) {
                if (currentPlayer === "white") {
                    checkmateTitle.textContent = "Checkmate!";
                    checkmateMessage.textContent = "Black wins the game.";
                    winnerIcon.textContent = "♛";

                    let blackWins = parseInt(sessionStorage.getItem("blackWins") || "0");
                    blackWins++;
                    sessionStorage.setItem("blackWins", blackWins);
                } else {
                    checkmateTitle.textContent = "Checkmate!";
                    checkmateMessage.textContent = "White wins the game.";
                    winnerIcon.textContent = "♕";

                    let whiteWins = parseInt(sessionStorage.getItem("whiteWins") || "0");
                    whiteWins++;
                    sessionStorage.setItem("whiteWins", whiteWins);
                }

                playSound(winSound);

                if (bgMusic) {
                    bgMusic.pause();
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
    renderCheckState();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateMovePiece(fromRow, fromCol, toRow, toCol, pieceImageSrc) {
    const fromSquare = document.getElementById(`square-${fromRow}-${fromCol}`);
    const toSquare = document.getElementById(`square-${toRow}-${toCol}`);

    if (!fromSquare || !toSquare || !pieceImageSrc) return;

    const fromRect = fromSquare.getBoundingClientRect();
    const toRect = toSquare.getBoundingClientRect();

    const flyingPiece = document.createElement("img");
    flyingPiece.src = pieceImageSrc;
    flyingPiece.classList.add("flying-piece");

    flyingPiece.style.left = `${fromRect.left + (fromRect.width - 76) / 2}px`;
    flyingPiece.style.top = `${fromRect.top + (fromRect.height - 76) / 2}px`;

    document.body.appendChild(flyingPiece);

    await wait(10);

    flyingPiece.style.transition = "left 0.22s ease, top 0.22s ease, transform 0.22s ease";
    flyingPiece.style.left = `${toRect.left + (toRect.width - 76) / 2}px`;
    flyingPiece.style.top = `${toRect.top + (toRect.height - 76) / 2}px`;
    flyingPiece.style.transform = "scale(1.04)";

    await wait(230);
    flyingPiece.remove();
}

async function animateCapturePiece(row, col, pieceImageSrc) {
    const targetSquare = document.getElementById(`square-${row}-${col}`);
    if (!targetSquare || !pieceImageSrc) return;

    const rect = targetSquare.getBoundingClientRect();

    const capturedPiece = document.createElement("img");
    capturedPiece.src = pieceImageSrc;
    capturedPiece.classList.add("captured-fade");

    capturedPiece.style.left = `${rect.left + (rect.width - 76) / 2}px`;
    capturedPiece.style.top = `${rect.top + (rect.height - 76) / 2}px`;

    document.body.appendChild(capturedPiece);

    await wait(290);
    capturedPiece.remove();
}

updateMuteButton();
generateBoard();
updateBoard();
const chessboard = document.getElementById("chessboard");
const game = new Game();

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
            square.textContent = "";

            const piece = game.getPiece(row, col);
            if (piece) {
                square.textContent = piece.symbol;
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

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
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
            const opponent = game.currentTurn;

            if (game.isCheckmate(opponent)) {
                alert(`Checkmate! ${opponent} loses.`);
                game.gameOver = true;
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
}

generateBoard();
updateBoard();
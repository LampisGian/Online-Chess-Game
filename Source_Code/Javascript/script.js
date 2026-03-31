const chessboard = document.getElementById("chessboard");

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

            chessboard.appendChild(square);
        }
    }
}

generateBoard();

const whiteKing = new King("white", 7, 4);
const blackQueen = new Queen("black", 0, 3);

console.log(whiteKing);
console.log(blackQueen);
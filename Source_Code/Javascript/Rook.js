//This class represents the Rook piece in the chess game, it extends the Piece class and defines its specific movement patterns and image representation based on its color.

class Rook extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Rook";
        this.image = color === "white"
            ? "../Assets/Images/White/Rook.png"
            : "../Assets/Images/Black/Rook.png";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ]);
    }
}
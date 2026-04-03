//This class represents the Queen piece in the chess game, it extends the Piece class and defines its specific movement patterns and image representation based on its color.

class Queen extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Queen";
        this.image = color === "white"
            ? "../Assets/Images/White/Queen.png"
            : "../Assets/Images/Black/Queen.png";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ]);
    }
}
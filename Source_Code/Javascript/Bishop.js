//This class represents the Bishop piece in the chess game, it extends the Piece class and defines its specific movement patterns and image representation based on its color.
class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Bishop";
        this.image = color === "white"
            ? "../Assets/Images/White/Bishop.png"
            : "../Assets/Images/Black/Bishop.png";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ]);
    }
}
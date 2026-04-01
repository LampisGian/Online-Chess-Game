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
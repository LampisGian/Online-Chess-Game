class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Bishop";
        this.symbol = color === "black" ? "♗" : "♝";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ]);
    }
}
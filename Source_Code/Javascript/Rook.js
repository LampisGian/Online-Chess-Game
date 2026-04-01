class Rook extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Rook";
        this.symbol = color === "black" ? "♖" : "♜";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ]);
    }
}
class Queen extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Queen";
        this.symbol = color === "white" ? "♕" : "♛";
    }

    getValidMoves(game) {
        return this.getDirectionalMoves(game, [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ]);
    }
}
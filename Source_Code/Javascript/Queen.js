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
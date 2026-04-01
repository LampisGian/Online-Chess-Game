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
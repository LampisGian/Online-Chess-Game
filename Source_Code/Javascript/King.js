class King extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "King";
         this.image = color === "white"
            ? "../Assets/Images/White/King.png"
            : "../Assets/Images/Black/King.png";
    }

    getValidMoves(game) {
        const moves = [];
        const offsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dr, dc] of offsets) {
            const newRow = this.row + dr;
            const newCol = this.col + dc;

            if (
                game.isInsideBoard(newRow, newCol) &&
                !game.isFriendlyPiece(newRow, newCol, this.color)
            ) {
                moves.push({ row: newRow, col: newCol });
            }
        }

        return moves;
    }
}
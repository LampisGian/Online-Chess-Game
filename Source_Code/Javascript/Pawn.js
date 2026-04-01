class Pawn extends Piece {
    constructor(color, row, col) {
        super(color, row, col);
        this.name = "Pawn";
        this.symbol = color === "black" ? "♙" : "♟";
    }

    getValidMoves(game) {
        const moves = [];
        const direction = this.color === "white" ? -1 : 1;
        const startRow = this.color === "white" ? 6 : 1;

        const oneStepRow = this.row + direction;
        if (game.isInsideBoard(oneStepRow, this.col) && game.isEmpty(oneStepRow, this.col)) {
            moves.push({ row: oneStepRow, col: this.col });

            const twoStepRow = this.row + 2 * direction;
            if (this.row === startRow && game.isEmpty(twoStepRow, this.col)) {
                moves.push({ row: twoStepRow, col: this.col });
            }
        }

        const captureLeftCol = this.col - 1;
        const captureRightCol = this.col + 1;

        if (game.isInsideBoard(oneStepRow, captureLeftCol) && game.isEnemyPiece(oneStepRow, captureLeftCol, this.color)) {
            moves.push({ row: oneStepRow, col: captureLeftCol });
        }

        if (game.isInsideBoard(oneStepRow, captureRightCol) && game.isEnemyPiece(oneStepRow, captureRightCol, this.color)) {
            moves.push({ row: oneStepRow, col: captureRightCol });
        }

        return moves;
    }
}
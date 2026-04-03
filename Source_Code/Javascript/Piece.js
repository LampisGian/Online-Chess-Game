//This class represents a generic chess piece, it serves as a base class for all specific piece types (Pawn, Rook, Knight, Bishop, Queen, King) and defines common properties and methods such as position, color, and movement logic that can be shared and overridden by the specific piece classes.
class Piece {
    constructor(color, row, col) {
        this.color = color;
        this.row = row;
        this.col = col;
        this.name = "Piece";
        this.symbol = "";
    }

    getPosition() {
        return { row: this.row, col: this.col };
    }

    setPosition(row, col) {
        this.row = row;
        this.col = col;
    }

    getDirectionalMoves(game, directions) {
        const moves = [];

        for (const [dr, dc] of directions) {
            let newRow = this.row + dr;
            let newCol = this.col + dc;

            while (game.isInsideBoard(newRow, newCol)) {
                if (game.isEmpty(newRow, newCol)) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (game.isEnemyPiece(newRow, newCol, this.color)) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }

                newRow += dr;
                newCol += dc;
            }
        }

        return moves;
    }

    getValidMoves(game) {
        return [];
    }
}
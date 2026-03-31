class Pawn extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Pawn";
        this.symbol = color === "white" ? "♙" : "♟";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
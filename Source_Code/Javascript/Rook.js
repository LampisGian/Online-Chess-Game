class Rook extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Rook";
        this.symbol = color === "white" ? "♖" : "♜";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
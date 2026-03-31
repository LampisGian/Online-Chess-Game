class Bishop extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Bishop";
        this.symbol = color === "white" ? "♗" : "♝";
    }

    getValidMoves(board) 
    {
        return [];
    }
}

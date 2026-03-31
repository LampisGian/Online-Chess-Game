class King extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "King";
        this.symbol = color === "white" ? "♔" : "♚";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
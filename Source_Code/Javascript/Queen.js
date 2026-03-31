class Queen extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Queen";
        this.symbol = color === "white" ? "♕" : "♛";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
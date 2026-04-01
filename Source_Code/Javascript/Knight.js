class Knight extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Knight";
        this.symbol = color === "black" ? "♘" : "♞";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
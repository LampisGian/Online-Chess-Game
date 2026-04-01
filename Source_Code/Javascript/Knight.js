class Knight extends Piece 
{
    constructor(color, row, col) 
    {
        super(color, row, col);
        this.name = "Knight";
        this.image = color === "white"
            ? "../Assets/Images/White/Knight.png"
            : "../Assets/Images/Black/Knight.png";
    }

    getValidMoves(board) 
    {
        return [];
    }
}
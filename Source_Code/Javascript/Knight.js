//This class represents the Knight piece in the chess game, it extends the Piece class and defines its specific movement patterns and image representation based on its color.

class Knight extends Piece {
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
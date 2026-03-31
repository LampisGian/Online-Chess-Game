class Piece 
{
    constructor(color, row, col) 
    {
        this.color = color;
        this.row = row;
        this.col = col;
        this.name = "Piece";
        this.symbol = "";
    }

    getPosition() 
    {
        return {
            row: this.row,
            col: this.col
        };
    }

    setPosition(row, col) 
    {
        this.row = row;
        this.col = col;
    }

    getValidMoves(board) 
    {
        return [];
    }
}
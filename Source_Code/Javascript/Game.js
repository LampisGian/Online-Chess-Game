class Game 
{
    constructor() 
    {
        this.board = this.createEmptyBoard();
        this.currentTurn = "white";
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameOver = false;
        this.capturedWhitePieces = [];
        this.capturedBlackPieces = [];

        this.initializePieces();
    }

    createEmptyBoard() 
    {
        const board = [];

        for (let row = 0; row < 8; row++) 
            {
            board[row] = [];

            for (let col = 0; col < 8; col++) 
            {
                board[row][col] = null;
            }
        }
        return board;
    }

    initializePieces() 
    {
        // Black pieces
        this.board[0][0] = new Rook("black", 0, 0);
        this.board[0][1] = new Knight("black", 0, 1);
        this.board[0][2] = new Bishop("black", 0, 2);
        this.board[0][3] = new Queen("black", 0, 3);
        this.board[0][4] = new King("black", 0, 4);
        this.board[0][5] = new Bishop("black", 0, 5);
        this.board[0][6] = new Knight("black", 0, 6);
        this.board[0][7] = new Rook("black", 0, 7);

        for (let col = 0; col < 8; col++) 
        {
            this.board[1][col] = new Pawn("black", 1, col);
        }

        // White pieces
        this.board[7][0] = new Rook("white", 7, 0);
        this.board[7][1] = new Knight("white", 7, 1);
        this.board[7][2] = new Bishop("white", 7, 2);
        this.board[7][3] = new Queen("white", 7, 3);
        this.board[7][4] = new King("white", 7, 4);
        this.board[7][5] = new Bishop("white", 7, 5);
        this.board[7][6] = new Knight("white", 7, 6);
        this.board[7][7] = new Rook("white", 7, 7);

        for (let col = 0; col < 8; col++) 
        {
            this.board[6][col] = new Pawn("white", 6, col);
        }
    }

    isInsideBoard(row, col) 
    {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    getPiece(row, col) 
    {
        if (!this.isInsideBoard(row, col)) return null;
        return this.board[row][col];
    }

    isEmpty(row, col) 
    {
        return this.getPiece(row, col) === null;
    }

    isEnemyPiece(row, col, color) 
    {
        const piece = this.getPiece(row, col);
        return piece !== null && piece.color !== color;
    }

    isFriendlyPiece(row, col, color) 
    {
        const piece = this.getPiece(row, col);
        return piece !== null && piece.color === color;
    }

    movePiece(fromRow, fromCol, toRow, toCol, isSimulation = false) {
    const piece = this.board[fromRow][fromCol];
    const targetPiece = this.board[toRow][toCol];

    if (targetPiece && !isSimulation) {
        if (targetPiece.color === "white") {
            this.capturedWhitePieces.push(targetPiece);
        } else {
            this.capturedBlackPieces.push(targetPiece);
        }
    }

    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;
    piece.setPosition(toRow, toCol);
    }


    switchTurn() 
    {
        this.currentTurn = this.currentTurn === "white" ? "black" : "white";
    }

        findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.name === "King" && piece.color === color) {
                    return piece;
                }
            }
        }
        return null;
    }

    isKingInCheck(color) {
        const king = this.findKing(color);
        if (!king) return false;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];

                if (piece && piece.color !== color) {
                    const moves = piece.getValidMoves(this);
                    const attacksKing = moves.some(
                        move => move.row === king.row && move.col === king.col
                    );

                    if (attacksKing) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

        cloneBoard() {
        const newBoard = this.createEmptyBoard();

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    let clonedPiece = null;

                    switch (piece.name) {
                        case "King":
                            clonedPiece = new King(piece.color, piece.row, piece.col);
                            break;
                        case "Queen":
                            clonedPiece = new Queen(piece.color, piece.row, piece.col);
                            break;
                        case "Rook":
                            clonedPiece = new Rook(piece.color, piece.row, piece.col);
                            break;
                        case "Bishop":
                            clonedPiece = new Bishop(piece.color, piece.row, piece.col);
                            break;
                        case "Knight":
                            clonedPiece = new Knight(piece.color, piece.row, piece.col);
                            break;
                        case "Pawn":
                            clonedPiece = new Pawn(piece.color, piece.row, piece.col);
                            break;
                    }

                    newBoard[row][col] = clonedPiece;
                }
            }
        }

        return newBoard;
    }

    getLegalMoves(piece) {
        const candidateMoves = piece.getValidMoves(this);
        const legalMoves = [];

        for (const move of candidateMoves) {
            const originalBoard = this.board;
            this.board = this.cloneBoard();

            const clonedPiece = this.board[piece.row][piece.col];
            this.movePiece(clonedPiece.row, clonedPiece.col, move.row, move.col, true);

            const stillInCheck = this.isKingInCheck(piece.color);

            this.board = originalBoard;

            if (!stillInCheck) {
                legalMoves.push(move);
            }
        }

        return legalMoves;
    }

        hasAnyLegalMoves(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];

                if (piece && piece.color === color) {
                    const legalMoves = this.getLegalMoves(piece);
                    if (legalMoves.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isCheckmate(color) {
        return this.isKingInCheck(color) && !this.hasAnyLegalMoves(color);
    }

    resetGame() {
    this.board = this.createEmptyBoard();
    this.currentTurn = "white";
    this.selectedPiece = null;
    this.validMoves = [];
    this.gameOver = false;

    this.capturedWhitePieces = [];
    this.capturedBlackPieces = [];

    this.initializePieces();
    }
}
var Pieces;
(function (Pieces) {
    Pieces[Pieces["X"] = 0] = "X";
    Pieces[Pieces["O"] = 1] = "O";
})(Pieces || (Pieces = {}));
class PieceX {
}
class PieceO {
}
class Board {
    constructor(n) {
        this.size = n;
        this.board = Array.from({ length: n }, () => Array(n).fill(null));
    }
    addPiece(row, col, placePiece) {
        if (this.board[row][col] != null)
            return false;
        this.board[row][col] = placePiece;
        return true;
    }
    printBoard() {
        for (let row of this.board) {
            console.log(row.map((cell) => (cell ? Pieces[cell.type] : '-')).join(' '));
        }
        console.log('\n');
    }
    checkWinner() {
        var _a, _b, _c, _d;
        // Check rows
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][0] &&
                this.board[i].every((cell) => { var _a; return (cell === null || cell === void 0 ? void 0 : cell.type) === ((_a = this.board[i][0]) === null || _a === void 0 ? void 0 : _a.type); })) {
                return ((_a = this.board[i][0]) === null || _a === void 0 ? void 0 : _a.type) || null;
            }
        }
        // Check columns
        for (let i = 0; i < this.size; i++) {
            if (this.board[0][i] &&
                this.board.every((row) => { var _a, _b; return ((_a = row[i]) === null || _a === void 0 ? void 0 : _a.type) === ((_b = this.board[0][i]) === null || _b === void 0 ? void 0 : _b.type); })) {
                return ((_b = this.board[0][i]) === null || _b === void 0 ? void 0 : _b.type) || null;
            }
        }
        // Check diagonals
        if (this.board[0][0] &&
            this.board.every((_, i) => { var _a, _b; return ((_a = this.board[i][i]) === null || _a === void 0 ? void 0 : _a.type) === ((_b = this.board[0][0]) === null || _b === void 0 ? void 0 : _b.type); })) {
            return ((_c = this.board[0][0]) === null || _c === void 0 ? void 0 : _c.type) || null;
        }
        if (this.board[0][this.size - 1] &&
            this.board.every((_, i) => {
                var _a, _b;
                return ((_a = this.board[i][this.size - 1 - i]) === null || _a === void 0 ? void 0 : _a.type) ===
                    ((_b = this.board[0][this.size - 1]) === null || _b === void 0 ? void 0 : _b.type);
            })) {
            return ((_d = this.board[0][this.size - 1]) === null || _d === void 0 ? void 0 : _d.type) || null;
        }
        return null;
    }
    isFull() {
        return this.board.every((row) => row.every((cell) => cell != null));
    }
}
class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPiece() {
        return this.type;
    }
    setPiece(P) {
        this.type = P;
    }
}
class TicTacToe {
    constructor(size, player1Name, player2Name) {
        this.board = new Board(size);
        const player1 = new Player(player1Name, new PieceO());
        const player2 = new Player(player2Name, new PieceX());
        this.players = [player1, player2];
        this.currentPlayerIndex = 0;
    }
    startGame() {
        console.log('Starting Tic-Tac-Toe!\n');
        while (true) {
            const currentPlayer = this.players[this.currentPlayerIndex];
            console.log(`${currentPlayer.getName()}'s turn (${Pieces[currentPlayer.getPiece().type]}):`);
            const move = this.getMove();
            const isValidMove = this.board.addPiece(move.row, move.col, currentPlayer.getPiece());
            if (!isValidMove) {
                console.log('Invalid move! Try again.');
                continue;
            }
            this.board.printBoard();
            const winner = this.board.checkWinner();
            if (winner != null) {
                console.log(`Game over! ${currentPlayer.getName()} wins!`);
                break;
            }
            if (this.board.isFull()) {
                console.log("Game over! It's a draw.");
                break;
            }
            this.currentPlayerIndex = 1 - this.currentPlayerIndex; // Toggle between 0 and 1
        }
    }
    getMove() {
        // Simulate user input for simplicity; replace this with actual user input logic.
        const row = Math.floor(Math.random() * this.board.size);
        const col = Math.floor(Math.random() * this.board.size);
        console.log(`Selected move: Row ${row}, Col ${col}`);
        return { row, col };
    }
}
// Initialize the game
const game = new TicTacToe(3, 'Player 1', 'Player 2');
game.startGame();

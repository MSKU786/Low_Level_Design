enum Pieces {
  'X',
  'O',
}

interface PlayingPiece {
  type: Pieces;
}

class PieceX implements PlayingPiece {
  type: Pieces.X;
}

class PieceO implements PlayingPiece {
  type: Pieces.O;
}

class Board {
  public board: PlayingPiece[][];
  public size: number;

  constructor(n: number) {
    this.size = n;
    this.board = Array.from({ length: n }, () => Array(n).fill(null));
  }

  addPiece(row: number, col: number, placePiece: PlayingPiece): boolean {
    if (this.board[row][col] != null) return false;

    this.board[row][col] = placePiece;
    return true;
  }

  printBoard(): void {
    for (let row of this.board) {
      console.log(
        row
          .map((cell) => {
            console.log('0lo', cell);
            return cell ? Pieces[cell.type] : '-';
          })
          .join(' ')
      );
    }
    console.log('\n');
  }

  checkWinner(): Pieces | null {
    // Check rows
    for (let i = 0; i < this.size; i++) {
      if (
        this.board[i][0] &&
        this.board[i].every((cell) => cell?.type === this.board[i][0]?.type)
      ) {
        return this.board[i][0]?.type || null;
      }
    }

    // Check columns
    for (let i = 0; i < this.size; i++) {
      if (
        this.board[0][i] &&
        this.board.every((row) => row[i]?.type === this.board[0][i]?.type)
      ) {
        return this.board[0][i]?.type || null;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] &&
      this.board.every(
        (_, i) => this.board[i][i]?.type === this.board[0][0]?.type
      )
    ) {
      return this.board[0][0]?.type || null;
    }

    if (
      this.board[0][this.size - 1] &&
      this.board.every(
        (_, i) =>
          this.board[i][this.size - 1 - i]?.type ===
          this.board[0][this.size - 1]?.type
      )
    ) {
      return this.board[0][this.size - 1]?.type || null;
    }

    return null;
  }

  isFull(): boolean {
    return this.board.every((row) => row.every((cell) => cell != null));
  }
}

class Player {
  private name: string;
  type: PlayingPiece;

  constructor(name: string, type: PlayingPiece) {
    this.name = name;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPiece(): PlayingPiece {
    return this.type;
  }

  setPiece(P: PlayingPiece) {
    this.type = P;
  }
}

class TicTacToe {
  private board: Board;
  private players: [Player, Player];
  private currentPlayerIndex: number;

  constructor(size: number, player1Name: string, player2Name: string) {
    this.board = new Board(size);
    const player1 = new Player(player1Name, new PieceO());
    const player2 = new Player(player2Name, new PieceX());
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
  }

  startGame(): void {
    console.log('Starting Tic-Tac-Toe!\n');
    while (true) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      console.log(
        `${currentPlayer.getName()}'s turn (${
          Pieces[currentPlayer.getPiece().type]
        }):`
      );

      const move = this.getMove();
      const isValidMove = this.board.addPiece(
        move.row,
        move.col,
        currentPlayer.getPiece()
      );

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

  private getMove(): { row: number; col: number } {
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

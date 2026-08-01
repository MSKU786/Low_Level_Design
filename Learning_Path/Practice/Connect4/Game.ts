class Connect4Game {
  player1: Player;
  player2: Player;
  private board: Board;
  private gameState: GameState;
  private currentPlayer: Player;

  constructor(p1: Player, p2: Player, board: Board) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = board;
    this.gameState = GameState.INPROGRESS;
    this.currentPlayer = p1;
  }

  playMove(col: number, color: Color) {
    // take player input
    // update move (validation + board update)
    // checkwinner
    // UpdateGameState

    if (this.gameState != GameState.INPROGRESS) {
      throw new Error('Game already Ended');
    }

    let player = this.getPlayer(color);

    if (player != this.currentPlayer) {
      return {
        isValid: false,
        error: 'Not your turn',
        gameState: this.gameState,
      };
    }

    let result = this.board.dropPiece(column, color);
    if (!result.isValid) {
      return result;
    }

    if (this.board.checkWin(column, result.row, color)) {
      this.gameState = GameState.WIN;
      return {
        isValid: true,
        gameState: this.gameState,
        error: null,
      };
    }

    if (this.board.isBoardFull()) {
      this.gameState = GameState.DRAW;
      return {
        isValid: true,
        gameState: this.gameState,
        error: null,
      };
    }

    this.switchPlayer();
  }

  private checkWinner(playerInput) {}
}

enum GameState {
  DRAW,
  INPROGRESS,
  WIN,
}

enum Color {
  RED,
  GREEN,
  YELLOW,
  BLUE,
}

class Player {
  name: string;
  color: Color;

  constructor(name: string, color: Color) {
    this.name = name;
    this.color = color;
  }
}

class Board {
  board = new Array(7).fill(null).map(() => new Array(6));
  updateBoard() {
    try {
      this.validate(i);
    } catch (e) {
      throw new Error(e.msg);
    }
  }

  private validate(i) {}
}

function main() {
  let p1 = new Player('M', Color.RED);
  let p2 = new Player('S', Color.BLUE);
  let board = new Board();
}

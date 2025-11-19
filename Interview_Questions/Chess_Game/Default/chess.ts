
abstract class Piece {
  isWhite: boolean;
  isKilled: boolean;
  movementStrategy: MovementStrategy;
  constructor(isWhite: boolean, movementStrategy) {
    this.isWhite = isWhite;
    this.isKilled = false;
    this.movementStrategy: movementStrategy;
  }

  setKilled() {
    this.isKilled = true;
  }
}

class King extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }

  isValidMove(): boolean {
    return false;
  }
}

class Queen extends Piece {

  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }


}

class Rook extends Piece {
     constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
  }

}

class Pawn extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }



}
}

class Bishop extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

class King extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

class Board {
  cells: Cell[][];
  player1: Player;
  player2: Player;
}

class Cell {
  piece: Piece;
  x: number;
  y: number;

  getPiece(): Piece {
    return this.piece;
  }
}

class Game {
  board: Board;
  p1: Player;
  p2: Player;
}

class Player {
  name: string;
  email: string;
  isWinner: boolean;
}

class MovementStrategy {
  canMove(board, startCell: Cell, endCell: Cell) {}
}

class PieceFactory {
  public static createPrice(
    type: string,
    isWhite: boolean,
    movementStrategy: MovementStrategy
  ) {
    switch (type.toLowerCase()) {
      case 'king':
        return new King(isWhite, movementStrategy);

      case 'queen':
        return new Queen(isWhite, movementStrategy);

      case 'rook':
        return new Rook(isWhite, movementStrategy);

      case 'bishop':
        return new Bishop(isWhite, movementStrategy);

      case 'knight':
        return new Knight(isWhite, movementStrategy);
    }
  }
}

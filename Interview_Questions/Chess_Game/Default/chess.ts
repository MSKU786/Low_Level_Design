class Player {}

abstract class Piece {
  isWhite: boolean;
  isKilled: boolean;

  abstract isValidMove(): boolean;
}

class King extends Piece {
  isValidMove(): boolean {
    return false;
  }
}

class Queen extends Piece {
  isValidMove(): boolean {
    return false;
  }
}

class Rook extends Piece {
  isValidMove(): boolean {
    return false;
  }
}

class Pawn extends Piece {
  isValidMove(): boolean {
    return false;
  }
}

class Board {}

class Cell {
  piece: Piece;
  x: number;
  y: number;

  getPiece(): Piece {
    return this.piece;
  }
}

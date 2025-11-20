import { Piece } from './PIeces';

export class Cell {
  piece: Piece | null;
  x: number;
  y: number;

  constructor(x: number, y: number, piece = null) {
    this.x = x;
    this.y = y;
    this.piece = piece;
  }

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    return this.setPiece;
  }
}

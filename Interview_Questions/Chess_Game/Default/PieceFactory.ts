import { MovementStrategy } from './movmentStrategy';
import { King, Queen, Rook, Bishop, Knight, Pawn } from './PIeces';

export class PieceFactory {
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

      case 'pawn':
        return new Pawn(isWhite, movementStrategy);

      default:
        throw new Error('Unindentified Piece Intialziation');
    }
  }
}

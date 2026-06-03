// Chain of Responsibility Pattern Example - For Move Validation
import {Board} from '../Chess';
import {Cell} from '../Cell';
import {Piece} from '../PIeces';
import {Player} from '../Chess';

export enum ValidationResult {
  VALID = 'VALID',
  INVALID_PIECE = 'INVALID_PIECE',
  INVALID_MOVE = 'INVALID_MOVE',
  PATH_BLOCKED = 'PATH_BLOCKED',
  KING_IN_CHECK = 'KING_IN_CHECK',
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
}

export interface Move {
  from: Cell;
  to: Cell;
  piece: Piece;
  player: Player;
}

export abstract class MoveValidator {
  protected next?: MoveValidator;

  setNext(validator: MoveValidator): MoveValidator {
    this.next = validator;
    return validator;
  }

  validate(move: Move, board: Board): ValidationResult {
    const result = this.doValidate(move, board);
    if (result !== ValidationResult.VALID || !this.next) {
      return result;
    }
    return this.next.validate(move, board);
  }

  protected abstract doValidate(move: Move, board: Board): ValidationResult;
}

export class PieceOwnershipValidator extends MoveValidator {
  protected doValidate(move: Move, board: Board): ValidationResult {
    const piece = move.from.getPiece();
    if (!piece) {
      return ValidationResult.INVALID_PIECE;
    }
    if (piece.isWhite !== move.player.getIsWhiteSide()) {
      return ValidationResult.NOT_YOUR_TURN;
    }
    return ValidationResult.VALID;
  }
}

export class PieceMoveValidator extends MoveValidator {
  protected doValidate(move: Move, board: Board): ValidationResult {
    const piece = move.piece;
    if (!piece.movementStrategy.canMove(board, move.from, move.to)) {
      return ValidationResult.INVALID_MOVE;
    }
    return ValidationResult.VALID;
  }
}

export class PathClearValidator extends MoveValidator {
  protected doValidate(move: Move, board: Board): ValidationResult {
    // Check if path is clear (except for Knight which jumps)
    // This is a simplified version - full implementation would check all cells in path
    const destinationPiece = move.to.getPiece();
    if (destinationPiece && destinationPiece.isWhite === move.piece.isWhite) {
      return ValidationResult.PATH_BLOCKED; // Can't capture own piece
    }
    return ValidationResult.VALID;
  }
}

export class CheckValidator extends MoveValidator {
  protected doValidate(move: Move, board: Board): ValidationResult {
    // Simulate move and check if it puts own king in check
    // This is a simplified version
    // Full implementation would:
    // 1. Execute move temporarily
    // 2. Check if own king is in check
    // 3. Undo move
    // 4. Return result

    // For now, just return valid
    return ValidationResult.VALID;
  }
}

// Usage:
// const validator = new PieceOwnershipValidator();
// validator
//   .setNext(new PieceMoveValidator())
//   .setNext(new PathClearValidator())
//   .setNext(new CheckValidator());
//
// const result = validator.validate(move, board);
// if (result === ValidationResult.VALID) {
//   // Execute move
// }

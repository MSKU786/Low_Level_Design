// Command Pattern Example - For Move Execution & Undo
import {Board} from '../Chess';
import {Cell} from '../Cell';
import {Piece} from '../PIeces';

export interface MoveCommand {
  execute(): void;
  undo(): void;
  isValid(): boolean;
}

export class StandardMoveCommand implements MoveCommand {
  private capturedPiece: Piece | null = null;
  private wasFirstMove: boolean = false;

  constructor(private board: Board, private from: Cell, private to: Cell) {}

  isValid(): boolean {
    const piece = this.from.getPiece();
    if (!piece) return false;

    // Additional validation can be added here
    return true;
  }

  execute(): void {
    const piece = this.from.getPiece();
    if (!piece) {
      throw new Error('No piece at source cell');
    }

    // Store captured piece if any
    this.capturedPiece = this.to.getPiece();

    // Store if this is piece's first move (for pawn double move, castling, etc.)
    // This would need to be tracked in Piece class
    // this.wasFirstMove = !piece.hasMoved();

    // Move piece
    this.to.setPiece(piece);
    this.from.setPiece(null);
  }

  undo(): void {
    const piece = this.to.getPiece();
    if (!piece) {
      throw new Error('No piece at destination cell');
    }

    // Restore piece to original position
    this.from.setPiece(piece);

    // Restore captured piece if any
    this.to.setPiece(this.capturedPiece);
    this.capturedPiece = null;
  }
}

// Example usage:
// const command = new StandardMoveCommand(board, fromCell, toCell);
// if (command.isValid()) {
//   command.execute();
//   moveHistory.push(command);
// }
//
// // To undo:
// if (moveHistory.length > 0) {
//   const lastMove = moveHistory.pop()!;
//   lastMove.undo();
// }

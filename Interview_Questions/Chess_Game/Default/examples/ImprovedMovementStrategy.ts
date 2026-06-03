// Improved Movement Strategy Implementation Example
import {MovementStrategy} from '../MovmentStrategy';
import {Board} from '../Chess';
import {Cell} from '../Cell';

export class ImprovedKingMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);

    // King can move one square in any direction
    return dx <= 1 && dy <= 1 && dx + dy > 0;
  }
}

export class ImprovedRookMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);

    // Rook moves horizontally or vertically
    if (dx === 0 && dy === 0) return false; // Same cell
    if (dx !== 0 && dy !== 0) return false; // Not horizontal or vertical

    // Check if path is clear
    return this.isPathClear(board, startCell, endCell);
  }

  private isPathClear(board: Board, start: Cell, end: Cell): boolean {
    const stepX = end.x > start.x ? 1 : end.x < start.x ? -1 : 0;
    const stepY = end.y > start.y ? 1 : end.y < start.y ? -1 : 0;

    let currentX = start.x + stepX;
    let currentY = start.y + stepY;

    while (currentX !== end.x || currentY !== end.y) {
      const cell = board.getCell(currentX, currentY);
      if (cell && cell.getPiece()) {
        return false; // Path is blocked
      }
      currentX += stepX;
      currentY += stepY;
    }

    return true;
  }
}

export class ImprovedBishopMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);

    // Bishop moves diagonally
    if (dx !== dy || dx === 0) return false;

    // Check if path is clear
    return this.isPathClear(board, startCell, endCell);
  }

  private isPathClear(board: Board, start: Cell, end: Cell): boolean {
    const stepX = end.x > start.x ? 1 : -1;
    const stepY = end.y > start.y ? 1 : -1;

    let currentX = start.x + stepX;
    let currentY = start.y + stepY;

    while (currentX !== end.x && currentY !== end.y) {
      const cell = board.getCell(currentX, currentY);
      if (cell && cell.getPiece()) {
        return false; // Path is blocked
      }
      currentX += stepX;
      currentY += stepY;
    }

    return true;
  }
}

export class ImprovedKnightMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);

    // Knight moves in L-shape: 2 squares in one direction, 1 square perpendicular
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    // Note: Knight doesn't need path checking as it jumps over pieces
  }
}

export class ImprovedQueenMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    // Queen combines Rook and Bishop movement
    const rookStrategy = new ImprovedRookMovementStrategy();
    const bishopStrategy = new ImprovedBishopMovementStrategy();

    return (
      rookStrategy.canMove(board, startCell, endCell) ||
      bishopStrategy.canMove(board, startCell, endCell)
    );
  }
}

export class ImprovedPawnMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const piece = startCell.getPiece();
    if (!piece) return false;

    const dx = endCell.x - startCell.x;
    const dy = endCell.y - startCell.y;
    const isWhite = piece.isWhite;

    // Pawn moves forward (direction depends on color)
    const forwardDirection = isWhite ? -1 : 1; // Assuming white starts at top (row 0)

    // Move forward one square
    if (dx === forwardDirection && dy === 0) {
      return !endCell.getPiece(); // Can only move if destination is empty
    }

    // Move forward two squares (only from starting position)
    const startingRow = isWhite ? 6 : 1; // Adjust based on your board setup
    if (
      dx === 2 * forwardDirection &&
      dy === 0 &&
      startCell.x === startingRow &&
      !endCell.getPiece()
    ) {
      // Check if intermediate cell is also empty
      const intermediateCell = board.getCell(
        startCell.x + forwardDirection,
        startCell.y
      );
      return intermediateCell ? !intermediateCell.getPiece() : false;
    }

    // Capture diagonally
    if (
      dx === forwardDirection &&
      Math.abs(dy) === 1 &&
      endCell.getPiece() &&
      endCell.getPiece()!.isWhite !== isWhite
    ) {
      return true;
    }

    // TODO: En passant capture

    return false;
  }
}

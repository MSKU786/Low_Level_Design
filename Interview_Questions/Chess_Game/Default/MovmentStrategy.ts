import { Cell } from './Cell';
import { Board } from './chess';

export abstract class MovementStrategy {
  abstract canMove(board: Board, startCell: Cell, endCell: Cell): boolean;
}

export class KingMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);
    if (dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0)) {
      const endPiece = endCell.getPiece();
      if (endPiece && endPiece.isWhite === startCell.piece!.isWhite)
        return false;
      return true;
    }
    return false;
  }
}

export class QueenMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    // Queen moves like rook or bishop
    const rookStrategy = new RookMovementStrategy();
    const bishopStrategy = new BishopMovementStrategy();
    return (
      rookStrategy.canMove(board, startCell, endCell) ||
      bishopStrategy.canMove(board, startCell, endCell)
    );
  }
}

export class BishopMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = endCell.x - startCell.x;
    const dy = endCell.y - startCell.y;
    if (Math.abs(dx) !== Math.abs(dy) || dx === 0) return false;
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    let x = startCell.x + stepX;
    let y = startCell.y + stepY;
    while (x !== endCell.x && y !== endCell.y) {
      if (board.getCell(x, y)!.getPiece()) return false;
      x += stepX;
      y += stepY;
    }
    const endPiece = endCell.getPiece();
    if (endPiece && endPiece.isWhite === startCell.piece!.isWhite) return false;
    return true;
  }
}

export class RookMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = endCell.x - startCell.x;
    const dy = endCell.y - startCell.y;
    if (dx === 0 && dy === 0) return false;
    if (dx === 0 || dy === 0) {
      if (dx === 0) {
        const step = dy > 0 ? 1 : -1;
        for (let y = startCell.y + step; y !== endCell.y; y += step) {
          if (board.getCell(startCell.x, y)!.getPiece()) return false;
        }
      } else {
        const step = dx > 0 ? 1 : -1;
        for (let x = startCell.x + step; x !== endCell.x; x += step) {
          if (board.getCell(x, startCell.y)!.getPiece()) return false;
        }
      }
      const endPiece = endCell.getPiece();
      if (endPiece && endPiece.isWhite === startCell.piece!.isWhite)
        return false;
      return true;
    }
    return false;
  }
}

export class KnightMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const dx = Math.abs(endCell.x - startCell.x);
    const dy = Math.abs(endCell.y - startCell.y);
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      const endPiece = endCell.getPiece();
      if (endPiece && endPiece.isWhite === startCell.piece!.isWhite)
        return false;
      return true;
    }
    return false;
  }
}

export class PawnMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell): boolean {
    const isWhite = startCell.piece!.isWhite;
    const direction = isWhite ? -1 : 1; // white moves up (negative x), black down (positive x)
    const startRow = isWhite ? 6 : 1;
    const dx = endCell.x - startCell.x;
    const dy = endCell.y - startCell.y;
    if (dy === 0) {
      // forward move
      if (dx === direction) {
        if (endCell.getPiece()) return false;
        return true;
      } else if (dx === 2 * direction && startCell.x === startRow) {
        if (endCell.getPiece()) return false;
        // check middle cell empty
        const middleCell = board.getCell(startCell.x + direction, startCell.y);
        if (middleCell!.getPiece()) return false;
        return true;
      }
    } else if (Math.abs(dy) === 1 && dx === direction) {
      // capture
      const endPiece = endCell.getPiece();
      if (endPiece && endPiece.isWhite !== isWhite) return true;
    }
    return false;
  }
}

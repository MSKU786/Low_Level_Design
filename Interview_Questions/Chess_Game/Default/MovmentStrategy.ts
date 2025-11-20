import { Cell } from './Cell';
import { Board } from './chess';

export abstract class MovementStrategy {
  abstract canMove(board: Board, startCell: Cell, endCell: Cell): boolean;
}

export class KingMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

export class QueenMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

export class BishopMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

export class RookMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

export class KnightMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

export class PawnMovementStrategy extends MovementStrategy {
  canMove(board: Board, startCell: Cell, endCell: Cell) {
    return true;
  }
}

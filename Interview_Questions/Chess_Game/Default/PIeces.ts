import { MovementStrategy } from './movmentStrategy';

export abstract class Piece {
  isWhite: boolean;
  isKilled: boolean;
  movementStrategy: MovementStrategy;
  constructor(isWhite: boolean, movementStrategy: MovementStrategy) {
    this.isWhite = isWhite;
    this.isKilled = false;
    this.movementStrategy = movementStrategy;
  }

  getIsKilled(): boolean {
    return this.isKilled;
  }
  setKilled() {
    this.isKilled = true;
  }
}

export class King extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }

  isValidMove(): boolean {
    return false;
  }
}

export class Queen extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

export class Rook extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

export class Pawn extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

export class Bishop extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

export class Knight extends Piece {
  constructor(isWhite: boolean, movemetnStrategy: MovementStrategy) {
    super(isWhite, movemetnStrategy);
  }
}

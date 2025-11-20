import { MovementStrategy } from './movmentStrategy';
import { Cell } from './Cell';
export class Board {
  private cells: Cell[][];
  private static boardInstance: Board;

  private constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.cells = new Array(8).fill(null).map(() => new Array(8).fill(null));
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) this.cells[i][j] = new Cell(i, j);
  }

  static getInstance(): Board {
    if (this.boardInstance == null) {
      this.boardInstance = new Board();
    }
    return this.boardInstance;
  }
}

class Game {
  board: Board;
  p1: Player;
  p2: Player;
  status: GameStatus;
}

export class Player {
  name: string;
  email: string;
  isWinner: boolean;
  isWhiteSide: boolean;

  constructor(name: string, email: string, isWhiteSide: boolean) {
    this.name = name;
    this.email = email;
    this.isWinner = false;
    this.isWhiteSide = isWhiteSide;
  }

  getIsWhiteSide() {
    return this.isWhiteSide;
  }
}

enum GameStatus {
  ACTIVE,
  DRAW,
  COMPLETED,
}

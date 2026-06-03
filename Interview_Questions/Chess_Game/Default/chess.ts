import {MovementStrategy} from './movmentStrategy';
import {Cell} from './Cell';
export class Board {
  private cells: Cell[][];

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.cells = new Array(8).fill(null).map(() => new Array(8).fill(null));
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) this.cells[i][j] = new Cell(i, j);
  }

  getCell(row: number, col: number): Cell | null {
    if (row < 0 || row >= 8 || col < 0 || col >= 8) {
      return null;
    }
    return this.cells[row][col];
  }

  getCells(): Cell[][] {
    return this.cells;
  }
}

export class Game {
  board: Board;
  p1: Player;
  p2: Player;
  status: GameStatus;
  private currentPlayerIndex: number = 0;

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.p1 = player1;
    this.p2 = player2;
    this.status = GameStatus.ACTIVE;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayerIndex === 0 ? this.p1 : this.p2;
  }

  switchTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  }
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

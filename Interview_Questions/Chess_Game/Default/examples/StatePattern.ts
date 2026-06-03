// State Pattern Example - For Game State Management
import {Game} from '../Chess';
import {Player} from '../Chess';

export interface GameState {
  makeMove(game: Game, from: any, to: any): MoveResult;
  canMakeMove(game: Game): boolean;
  getStatusMessage(): string;
}

export interface MoveResult {
  success: boolean;
  reason?: string;
  newState?: GameState;
}

export class ActiveGameState implements GameState {
  makeMove(game: Game, from: any, to: any): MoveResult {
    // Execute move logic
    // Check for check/checkmate after move
    return {success: true};
  }

  canMakeMove(game: Game): boolean {
    return true;
  }

  getStatusMessage(): string {
    return 'Game in progress';
  }
}

export class CheckmateState implements GameState {
  constructor(private winner: Player) {}

  makeMove(game: Game, from: any, to: any): MoveResult {
    return {
      success: false,
      reason: 'Game is over. Checkmate!',
    };
  }

  canMakeMove(game: Game): boolean {
    return false;
  }

  getStatusMessage(): string {
    return `${this.winner.name} wins by checkmate!`;
  }
}

export class StalemateState implements GameState {
  makeMove(game: Game, from: any, to: any): MoveResult {
    return {
      success: false,
      reason: 'Game is over. Stalemate!',
    };
  }

  canMakeMove(game: Game): boolean {
    return false;
  }

  getStatusMessage(): string {
    return 'Game ended in stalemate (draw)';
  }
}

// Usage in Game class:
// class Game {
//   private gameState: GameState = new ActiveGameState();
//
//   makeMove(from: Cell, to: Cell): MoveResult {
//     if (!this.gameState.canMakeMove(this)) {
//       return { success: false, reason: 'Cannot make move in current state' };
//     }
//
//     const result = this.gameState.makeMove(this, from, to);
//     if (result.newState) {
//       this.gameState = result.newState;
//     }
//     return result;
//   }
// }

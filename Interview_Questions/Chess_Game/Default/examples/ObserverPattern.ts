// Observer Pattern Example - For Game Events
import {Piece} from '../PIeces';
import {Player} from '../Chess';
import {Cell} from '../Cell';

export interface GameEvent {
  type: string;
  timestamp: Date;
}

export class MoveMadeEvent implements GameEvent {
  type = 'MOVE_MADE';
  timestamp = new Date();

  constructor(
    public from: Cell,
    public to: Cell,
    public piece: Piece,
    public player: Player
  ) {}
}

export class CheckEvent implements GameEvent {
  type = 'CHECK';
  timestamp = new Date();

  constructor(public king: Piece, public player: Player) {}
}

export class CheckmateEvent implements GameEvent {
  type = 'CHECKMATE';
  timestamp = new Date();

  constructor(public winner: Player, public loser: Player) {}
}

export class PieceCapturedEvent implements GameEvent {
  type = 'PIECE_CAPTURED';
  timestamp = new Date();

  constructor(public capturedPiece: Piece, public capturingPiece: Piece) {}
}

export interface GameObserver {
  onEvent(event: GameEvent): void;
}

export class ConsoleLoggerObserver implements GameObserver {
  onEvent(event: GameEvent): void {
    switch (event.type) {
      case 'MOVE_MADE':
        const moveEvent = event as MoveMadeEvent;
        console.log(
          `${moveEvent.player.name} moved ${moveEvent.piece.constructor.name} from (${moveEvent.from.x}, ${moveEvent.from.y}) to (${moveEvent.to.x}, ${moveEvent.to.y})`
        );
        break;
      case 'CHECK':
        const checkEvent = event as CheckEvent;
        console.log(`${checkEvent.player.name}'s king is in check!`);
        break;
      case 'CHECKMATE':
        const checkmateEvent = event as CheckmateEvent;
        console.log(`Checkmate! ${checkmateEvent.winner.name} wins!`);
        break;
      case 'PIECE_CAPTURED':
        const captureEvent = event as PieceCapturedEvent;
        console.log(
          `${captureEvent.capturingPiece.constructor.name} captured ${captureEvent.capturedPiece.constructor.name}`
        );
        break;
    }
  }
}

export class GameEventNotifier {
  private observers: GameObserver[] = [];

  subscribe(observer: GameObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: GameObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(event: GameEvent): void {
    this.observers.forEach((observer) => observer.onEvent(event));
  }
}

// Usage:
// const notifier = new GameEventNotifier();
// notifier.subscribe(new ConsoleLoggerObserver());
//
// // When move is made:
// notifier.notify(new MoveMadeEvent(from, to, piece, player));

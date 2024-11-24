class Snake {
  head: number;
  tail: number;

  constructor(head, tail) {
    if (tail > head) {
      throw new Error('Wrong data');
      return;
    }
    this.head = head;
    this.tail = tail;
  }
}

class Ladder {
  head: number;
  tail: number;

  constructor(head, tail) {
    if (head > tail) {
      throw new Error('Wrong data');
      return;
    }
    this.head = head;
    this.tail = tail;
  }
}

class Board {
  size: number;
  snakes: Map<number, Snake>;
  ladders: Map<number, Ladder>;

  constructor(size: number) {
    this.size = size;
    this.snakes = new Map();
    this.ladders = new Map();
  }

  addSnake(snake: Snake): void {
    this.snakes.set(snake.head, snake);
  }

  addLadder(ladder: Ladder): void {
    this.ladders.set(ladder.head, ladder);
  }

  getNewPosition(currentPosition: number): number {
    if (this.snakes.has(currentPosition)) {
      return this.snakes.get(currentPosition)!.tail;
    }
    if (this.ladders.has(currentPosition)) {
      return this.ladders.get(currentPosition)!.tail;
    }
    return currentPosition;
  }
}

class Dice {
  roll(): number {
    return Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
  }
}

class Player {
  name: string;
  id: string;
  position: number;

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.position = 0;
  }
}

class Game {
  board: Board;
  players: Player[];
  dice: Dice;
  currentPlayerIndex: number;

  constructor(boardSize: number, players: Player[]) {
    this.board = new Board(boardSize);
    this.players = players;
    this.dice = new Dice();
    this.currentPlayerIndex = 0; // Start with the first player
  }

  playTurn(): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const diceRoll = this.dice.roll();
    console.log(`${currentPlayer.name} rolled a ${diceRoll}.`);

    let newPosition = currentPlayer.position + diceRoll;

    if (newPosition > this.board.size) {
      console.log(`${currentPlayer.name} cannot move.`);
    } else {
      newPosition = this.board.getNewPosition(newPosition);
      console.log(`${currentPlayer.name} moves to position ${newPosition}.`);
      currentPlayer.position = newPosition;
    }

    if (newPosition === this.board.size) {
      console.log(`${currentPlayer.name} wins!`);
      return;
    }

    // Update to the next player's turn
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  start(): void {
    while (true) {
      this.playTurn();

      if (this.players.some((player) => player.position === this.board.size)) {
        break;
      }
    }
    console.log('Game Over!');
  }
}

// Initialize players
const players = [new Player('1', 'Alice'), new Player('2', 'Bob')];

// Initialize the game
const game = new Game(100, players);

// Add snakes
game.board.addSnake(new Snake(14, 7));
game.board.addSnake(new Snake(99, 78));

// Add ladders
game.board.addLadder(new Ladder(2, 15));
game.board.addLadder(new Ladder(23, 88));

// Start the game
game.start();

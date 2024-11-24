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

  constructor(id, name, position) {
    this.id = id;
    this.name = name;
    this.position = position;
  }
}

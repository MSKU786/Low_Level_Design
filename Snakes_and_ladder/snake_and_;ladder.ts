interface snake {
  head: number;
  tail: number;
}

interface ladder {
  head: number;
  tail: number;
}

class Board {
  spots: spot[];
}

class spot {
  index: number;
}

class Dice {
  roll(): number {
    return Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
  }
}

interface Player {
  currentPosition: spot;
}

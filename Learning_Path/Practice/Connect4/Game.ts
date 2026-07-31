class Connect4Game {
  player1: Player;
  player2: Player;
  board: Board;


  startGame() {

  }
}

enum Color {
  RED,
  GREEN,
  YELLOW,
  BLUE
}

class Player {
  name: string;

}

class Board {
  board = new Array(7).fill(null).map(() => new Array(6));
  updateBoard() {
    try {
      this.validate(i);
      
    } catch(e) {
      throw new Error(e.msg);
    }
  }

  private validate(i) {

  }
}


class GameState {
  constructor(p1: Player, p2: Player, board: Board) {

  }

  


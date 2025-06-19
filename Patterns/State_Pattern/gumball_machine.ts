class GumballMachine {
  static SOLD_OUT = 0;
  static HAS_QUARTER = 1;
  static NO_QUARTER = 2;
  static SOLD = 3;
  count: number;
  state = GumballMachine.SOLD_OUT;

  constructor(numberOfBall: number) {
    this.count = numberOfBall;
    if (numberOfBall > 0) {
      this.state = GumballMachine.NO_QUARTER;
    }
  }

  insertQuarter() {
    if (this.state === GumballMachine.SOLD_OUT) {
      this.removeQurarter();
      console.log('No balls are available');
    } else if (this.state === GumballMachine.HAS_QUARTER) {
      console.log('Quarter processed');
      console.log('Crank Handleee');
    } else if (this.state === GumballMachine.NO_QUARTER) {
      console.log('No Quarter Available');
    } else {
      console.log('Gumball is already processed.');
    }
  }

  removeQurarter() {}

  turnCrank() {}
}

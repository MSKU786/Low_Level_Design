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
      console.log('No balls are available');
    } else if (this.state === GumballMachine.HAS_QUARTER) {
      console.log("You can't insert another quarter");
    } else if (this.state === GumballMachine.NO_QUARTER) {
      console.log('You inserted a quarter');
      this.state = GumballMachine.HAS_QUARTER;
    } else if (this.state === GumballMachine.SOLD) {
      console.log('Wait, We are already giving you a gumball.');
    }
  }

  removeQurater() {
    if (this.state === GumballMachine.HAS_QUARTER) {
      this.state = GumballMachine.NO_QUARTER;
      console.log('Quarter Returned');
    } else if (this.state === GumballMachine.NO_QUARTER) {
      console.log("You haven't inserted a quarter");
    } else if (this.state === GumballMachine.SOLD) {
      console.log('Sorry you already turned the crank');
    } else if (this.state === GumballMachine.SOLD_OUT) {
      console.log("You can't eject, you haven't inserted a quarter");
    }
  }

  turnCrank() {
    if (this.state === GumballMachine.SOLD) {
      console.log('Turning twice doesn’t get you another gumball!');
    } else if (this.state === GumballMachine.NO_QUARTER) {
      console.log('You turned but there’s no quarter.');
    } else if (this.state === GumballMachine.SOLD_OUT) {
      console.log('You turned, but there are no gumballs.');
    } else if (this.state === GumballMachine.HAS_QUARTER) {
      console.log('You turned...');
      this.state = GumballMachine.SOLD;
      this.dispense();
    }
  }

  dispense() {
    if (this.state === GumballMachine.SOLD) {
      this.count--;
      if (this.count === 0) {
        console.log('Oops, out of gumballs!');
        this.state = GumballMachine.SOLD_OUT;
      } else {
        this.state = GumballMachine.NO_QUARTER;
      }
      console.log('A gumball comes rolling out the slot...');
    } else {
      console.log('No gumball dispensed.');
    }
  }
}

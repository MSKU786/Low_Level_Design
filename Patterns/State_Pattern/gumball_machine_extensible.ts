// State interface
interface State {
  insertQuarter(): void;
  removeQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

class GumballMachineE {
  SOLD_OUT: State;
  HAS_QUARTER: State;
  NO_QUARTER: State;
  SOLD: State;
  WINNER: State;

  currentState: State;
  count: number;

  constructor(numberOfBall: number) {
    this.SOLD_OUT = new SoldOutState(this);
    this.HAS_QUARTER = new HasQuarterState(this);
    this.NO_QUARTER = new NoQuarterState(this);
    this.SOLD = new SoldState(this);
    this.WINNER = new WinnerState(this);
    this.count = numberOfBall;
    if (numberOfBall > 0) {
      this.currentState = this.NO_QUARTER;
    }
  }

  insertQuarter(): void {
    this.currentState.insertQuarter();
  }

  removeQuarter(): void {
    this.currentState.removeQuarter();
  }

  turnCrank(): void {
    this.currentState.turnCrank();
    this.currentState.dispense();
  }
  setState(state: State) {
    this.currentState = state;
  }

  releaseBall() {
    if (this.count > 0) {
      console.log('One ball released....');
      this.count--;
    }
  }

  getNoQuarterState() {
    return this.NO_QUARTER;
  }

  getHasNoQuarterState() {
    return this.HAS_QUARTER;
  }

  getSoldState() {
    return this.SOLD;
  }

  getSoldOutState() {
    return this.SOLD_OUT;
  }

  getWinnerState() {
    return this.WINNER;
  }

  getState() {
    return this.currentState;
  }
}

class SoldOutState implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log('No balls are available');
    this.gumballMachine.removeQuarter();
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log('Quarter Returned');
    this.gumballMachine.setState(this.gumballMachine.getSoldOutState);
  }

  turnCrank() {
    console.log('You turned, but there are no gumballs.');
  }

  dispense() {
    console.log('No balls are available');
  }
}

class NoQuarterState implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log('You inserted a quarter');
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log("You haven't inserted a quarter");
  }

  turnCrank() {
    console.log('You turned but there’s no quarter.');
  }

  dispense() {
    console.log('You need to pay first');
  }
}

class HasQuarterState implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log("YOu can't insert another quarter");
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log('Quarter Returned');
    const random = Math.floor(Math.random() * 10) + 1;
    if (random===1) {
      this.gumballMachine.setState(this.gumballMachine.getWinnerState());
    } else 
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank() {
    console.log('You turned ........');
    //Randomly generate a number with probalblity of 10%
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }

  dispense() {
    console.log('No Gumball dispensed');
  }
}

class SoldState implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log('Wait, We are already giving you a gumball.');
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log('Sorry you already turned the crank');
  }

  turnCrank() {
    console.log('Turning twice doesn’t get you another gumball!');
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.count > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}

class WinnerState implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log('Wait, We are already giving you a gumball.');
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log('Sorry you already turned the crank');
  }

  turnCrank() {
    console.log('Turning twice doesn’t get you another gumball!');
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.count > 0) {
      this.gumballMachine.releaseBall();
      if (this.gumballMachine.count === 0) {
        this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
      } else
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}

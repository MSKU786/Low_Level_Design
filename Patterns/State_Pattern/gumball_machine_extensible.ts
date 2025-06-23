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

  currentState: State;
  count: number;

  constructor(numberOfBall: number) {
    this.SOLD_OUT = new SoldOutState(this);
    this.HAS_QUARTER = new HasQuarterState(this);
    this.NO_QUARTER = new NoQuarterState(this);
    this.SOLD = new SoldState(this);

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
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log('Quarter Returned');
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
  }

  turnCrank() {
    console.log('You turned ........');
    this.gumballMachine.setState();
  }

  dispense() {}
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

  dispense() {}
}

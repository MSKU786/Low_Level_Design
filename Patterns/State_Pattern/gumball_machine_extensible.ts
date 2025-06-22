// State interface
interface State {
  insertQuarter(): void;
  removeQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

class GumballMachineE {
  static SOLD_OUT: State;
  static HAS_QUARTER: State;
  static NO_QUARTER: State;
  static SOLD: State;

  currentState: State;
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

  dispense() {}
}

class NoQuarterSTate implements State {
  gumballMachine;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  insertQuarter() {
    console.log('No balls are available');
  }

  removeQuarter() {
    // this.state = GumballMachine.NO_QUARTER;
    console.log("You haven't inserted a quarter");
  }

  turnCrank() {
    console.log('You turned but there’s no quarter.');
  }

  dispense() {}
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

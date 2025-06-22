class GumballMachineE {}

interface state {
  insertQuarter();
  removeQuarter();
  turnCrank();
  dispense();
}

class SoldOutState implements state {
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

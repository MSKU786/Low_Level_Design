// State interface
interface State {
  insertQuarter(): void;
  removeQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

// Constants for better maintainability
const WINNER_PROBABILITY = 0.1; // 10% chance
const RANDOM_RANGE = 10;

class GumballMachineE {
  private readonly SOLD_OUT: State;
  private readonly HAS_QUARTER: State;
  private readonly NO_QUARTER: State;
  private readonly SOLD: State;
  private readonly WINNER: State;

  private currentState: State;
  private count: number;

  constructor(numberOfBalls: number) {
    this.SOLD_OUT = new SoldOutState(this);
    this.HAS_QUARTER = new HasQuarterState(this);
    this.NO_QUARTER = new NoQuarterState(this);
    this.SOLD = new SoldState(this);
    this.WINNER = new WinnerState(this);
    this.count = numberOfBalls;

    // Set initial state based on ball count
    this.currentState = numberOfBalls > 0 ? this.NO_QUARTER : this.SOLD_OUT;
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

  setState(state: State): void {
    this.currentState = state;
  }

  releaseBall(): void {
    if (this.count > 0) {
      console.log('One ball released....');
      this.count--;
    }
  }

  getCount(): number {
    return this.count;
  }

  // Getters for states
  getNoQuarterState(): State {
    return this.NO_QUARTER;
  }

  getHasQuarterState(): State {
    return this.HAS_QUARTER;
  }

  getSoldState(): State {
    return this.SOLD;
  }

  getSoldOutState(): State {
    return this.SOLD_OUT;
  }

  getWinnerState(): State {
    return this.WINNER;
  }

  getCurrentState(): State {
    return this.currentState;
  }

  // Helper method to check if machine is empty
  isEmpty(): boolean {
    return this.count === 0;
  }
}

// Base class to reduce code duplication
abstract class BaseState implements State {
  protected gumballMachine: GumballMachineE;

  constructor(machine: GumballMachineE) {
    this.gumballMachine = machine;
  }

  abstract insertQuarter(): void;
  abstract removeQuarter(): void;
  abstract turnCrank(): void;
  abstract dispense(): void;
}

class SoldOutState extends BaseState {
  insertQuarter(): void {
    console.log('No balls are available');
    this.gumballMachine.removeQuarter();
  }

  removeQuarter(): void {
    console.log('Quarter Returned');
    this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
  }

  turnCrank(): void {
    console.log('You turned, but there are no gumballs.');
  }

  dispense(): void {
    console.log('No balls are available');
  }
}

class NoQuarterState extends BaseState {
  insertQuarter(): void {
    console.log('You inserted a quarter');
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  removeQuarter(): void {
    console.log("You haven't inserted a quarter");
  }

  turnCrank(): void {
    console.log("You turned but there's no quarter.");
  }

  dispense(): void {
    console.log('You need to pay first');
  }
}

class HasQuarterState extends BaseState {
  insertQuarter(): void {
    console.log("You can't insert another quarter");
  }

  removeQuarter(): void {
    console.log('Quarter Returned');
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank(): void {
    console.log('You turned...');
    // Check for winner state (10% probability)
    const random = Math.floor(Math.random() * RANDOM_RANGE) + 1;
    if (random === 1) {
      this.gumballMachine.setState(this.gumballMachine.getWinnerState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getSoldState());
    }
  }

  dispense(): void {
    console.log('No Gumball dispensed');
  }
}

// Base class for states that handle dispensing
abstract class DispensingState extends BaseState {
  insertQuarter(): void {
    console.log('Wait, we are already giving you a gumball.');
  }

  removeQuarter(): void {
    console.log('Sorry, you already turned the crank');
  }

  turnCrank(): void {
    console.log("Turning twice doesn't get you another gumball!");
  }

  abstract dispense(): void;
}

class SoldState extends DispensingState {
  dispense(): void {
    this.gumballMachine.releaseBall();

    if (this.gumballMachine.isEmpty()) {
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }
  }
}

class WinnerState extends DispensingState {
  dispense(): void {
    console.log("YOU'RE A WINNER! You get two gumballs for your quarter!");
    this.gumballMachine.releaseBall();

    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.releaseBall();
    }

    if (this.gumballMachine.isEmpty()) {
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    } else {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }
  }
}

// Example usage and testing
function testGumballMachine(): void {
  console.log('=== Testing Gumball Machine ===');

  const machine = new GumballMachineE(5);
  console.log(`Initial state: ${machine.getCurrentState().constructor.name}`);
  console.log(`Initial count: ${machine.getCount()}`);

  // Test normal flow
  console.log('\n--- Normal Flow ---');
  machine.insertQuarter();
  machine.turnCrank();

  console.log(`\nRemaining balls: ${machine.getCount()}`);
  console.log(`Current state: ${machine.getCurrentState().constructor.name}`);

  // Test winner flow (may or may not happen due to randomness)
  console.log('\n--- Testing Winner Flow ---');
  machine.insertQuarter();
  machine.turnCrank();

  console.log(`\nRemaining balls: ${machine.getCount()}`);
  console.log(`Current state: ${machine.getCurrentState().constructor.name}`);
}

// to run tests
testGumballMachine();

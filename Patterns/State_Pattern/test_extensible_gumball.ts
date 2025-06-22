import {
  GumballMachineE,
  testGumballMachine,
} from './gumball_machine_extensible';

// Run the test
console.log('=== Testing Extensible Gumball Machine ===\n');
testGumballMachine();

// Additional test scenarios
console.log('\n=== Additional Test Scenarios ===\n');

// Test 1: Empty machine
console.log('Test 1: Empty machine');
const emptyMachine = new GumballMachineE(0);
console.log(emptyMachine.toString());
emptyMachine.insertQuarter();
emptyMachine.turnCrank();

// Test 2: Refill functionality
console.log('\nTest 2: Refill functionality');
const refillMachine = new GumballMachineE(1);
console.log(refillMachine.toString());
refillMachine.insertQuarter();
refillMachine.turnCrank();
console.log(refillMachine.toString());
refillMachine.refill(3);
console.log(refillMachine.toString());

// Test 3: Multiple operations
console.log('\nTest 3: Multiple operations');
const multiMachine = new GumballMachineE(3);
console.log(multiMachine.toString());

// Insert quarter and turn crank
multiMachine.insertQuarter();
multiMachine.turnCrank();
console.log(multiMachine.toString());

// Try to insert another quarter while in sold state
multiMachine.insertQuarter();
multiMachine.turnCrank();
console.log(multiMachine.toString());

// Insert quarter and remove it
multiMachine.insertQuarter();
multiMachine.removeQuarter();
console.log(multiMachine.toString());

// Try to turn crank without quarter
multiMachine.turnCrank();
console.log(multiMachine.toString());

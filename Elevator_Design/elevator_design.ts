enum Direction {
  UP = 'up',
  DOWN = 'down',
  IDLE = 'idle',
}

interface ElevatorState {
  direction: Direction;
  currentFloor: number;
  isIdle: boolean;
  capacity: number;
}

class Elevator {
  private id: number;
  private state: ElevatorState;
  private maxCapacity: number = 8;
  private maxWeight: number = 680; // in kg
  private stops: Set<number>; // Floors the elevator is scheduled to stop at

  constructor(id: number) {
    this.id = id;
    this.state = {
      currentFloor: 1,
      direction: Direction.IDLE,
      isIdle: true,
      capacity: 0,
    };
    this.stops = new Set();
  }

  move(): void {
    if (this.state.direction == Direction.UP) this.state.currentFloor++;
    else if (this.state.direction == Direction.DOWN) this.state.currentFloor--;

    if (this.stops.has(this.state.currentFloor)) {
      this.stop();
    }
  }

  stop(): void {
    this.state.direction = Direction.IDLE;
    this.state.isIdle = true;
    this.stops.delete(this.state.currentFloor);
    this.openDoors();
  }

  // Open doors
  openDoors(): void {
    console.log(
      `Elevator ${this.id}: Doors Open at Floor ${this.state.currentFloor}`
    );
  }

  scheduleStops(floor: number): void {
    this.stops.add(floor);
    this.updateDirection(floor);
  }

  // Update direction based on target floor
  private updateDirection(targetFloor: number): void {
    if (targetFloor > this.state.currentFloor)
      this.state.direction = Direction.UP;
    else if (targetFloor < this.state.currentFloor)
      this.state.direction = Direction.DOWN;
    else this.state.direction = Direction.IDLE;
  }

  // Get current elevator state
  getState(): ElevatorState {
    return this.state;
  }

  // Get elevator ID
  getId(): number {
    return this.id;
  }
}

class SmartDispatcher {
  private elevators: Elevator[];

  constructor(elevators: Elevator[]) {
    this.elevators = elevators;
  }

  assingElevator(floor: number, direction: Direction) {
    let bestElevator: Elevator | null = null;
    let bestScore = Infinity;

    for (let elevator of this.elevators) {
      let state = elevator.getState();

      let currentFloor = state.currentFloor;
      let distance = Math.abs(currentFloor - floor);

      //calcuation best elevator based on direction and distance
      const score =
        state.isIdle ||
        (state.direction === direction &&
          ((direction === Direction.UP && state.currentFloor <= floor) ||
            (direction === Direction.DOWN && state.currentFloor >= floor)))
          ? distance
          : Infinity;

      if (score > bestScore) {
        bestElevator = elevator;
        bestScore = score;
      }
    }

    if (bestElevator) {
      bestElevator.scheduleStops(floor);
    }

    return bestElevator;
  }
}

// Floor Class
class Floor {
  private floorNumber: number;

  constructor(floorNumber: number) {
    this.floorNumber = floorNumber;
  }

  // Call elevator
  callElevator(dispatcher: SmartDispatcher, direction: Direction): void {
    const elevator = dispatcher.assingElevator(this.floorNumber, direction);
    console.log(
      `Elevator ${elevator!.getId()} assigned to Floor ${this.floorNumber}`
    );
  }
}

class ElevatorSystem {
  private elevators: Elevator[];
  private floors: Floor[];
  private dispatcher: SmartDispatcher;

  constructor(numElevators: number, numFloors: number) {
    let elevators: Elevator[] = [];
    for (let i = 0; i < numElevators; i++) {
      elevators.push(new Elevator(i + 1));
    }
    this.elevators = elevators;
    let floors: Floor[] = [];
    for (let i = 0; i < numFloors; i++) floors.push(new Floor(i + 1));
    this.floors = floors;
    this.dispatcher = new SmartDispatcher(this.elevators);
  }

  // Simulate the system
  simulate(): void {
    // Example: A user calls an elevator from the 5th floor to go up
    this.floors[4].callElevator(this.dispatcher, Direction.UP);

    // Move elevators and handle their states
    for (const elevator of this.elevators) {
      elevator.move();
    }
  }
}


const system = new ElevatorSystem(3, 15);
system.simulate();
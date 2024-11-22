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
    this.stops.delete(this.state.currentFloor);\
    this.openDoors();
  }


  // Open doors
  openDoors(): void {
    console.log(`Elevator ${this.id}: Doors Open at Floor ${this.state.currentFloor}`);
  }

  scheduleStops(floor: number): void {
    this.stops.add(floor);
    this.updateDirection(floor);
  }

    // Update direction based on target floor
  private updateDirection(targetFloor: number): void {
    if (targetFloor > this.state.currentFloor) this.state.direction = Direction.UP;
    else if (targetFloor < this.state.currentFloor) this.state.direction = Direction.DOWN;
    else this.state.direction = Direction.IDLE;
  }
}

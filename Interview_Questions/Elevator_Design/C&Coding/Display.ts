import { Direction, Status } from './enum';

export class Display {
  currentFloor: number;
  direction: Direction;
  status: Status;
  nextDestination: number | null;

  constructor() {
    this.currentFloor = 1;
    this.direction = Direction.UP;
    this.status = Status.IDLE;
    this.nextDestination = null;
  }

  // Update display with current elevator status
  updateDisplay(
    floor: number,
    direction: Direction,
    status: Status,
    nextDestination?: number | null
  ): void {
    this.currentFloor = floor;
    this.direction = direction;
    this.status = status;
    this.nextDestination = nextDestination || null;
  }

  // Get display information
  getDisplayInfo(): {
    floor: number;
    direction: Direction;
    status: Status;
    nextDestination: number | null;
  } {
    return {
      floor: this.currentFloor,
      direction: this.direction,
      status: this.status,
      nextDestination: this.nextDestination,
    };
  }

  // Show display information
  showDisplay(): void {
    const info = this.getDisplayInfo();
    console.log(`=== Elevator Display ===`);
    console.log(`Current Floor: ${info.floor}`);
    console.log(`Direction: ${info.direction}`);
    console.log(`Status: ${Status[info.status]}`);
    if (info.nextDestination) {
      console.log(`Next Destination: ${info.nextDestination}`);
    }
    console.log(`=======================`);
  }
}

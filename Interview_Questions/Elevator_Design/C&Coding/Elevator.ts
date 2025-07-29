import { Display } from './Display';
import { Direction, Status } from './enum';
import { InternalButton } from './Internal_Button';

export class Elevator {
  id: number;
  display: Display;
  currentFloor: number;
  direction: Direction;
  status: Status;
  internalButton: InternalButton;

  // TASK Algorithm: Priority queues for request management
  private upRequests: number[] = []; // Max heap for UP direction
  private downRequests: number[] = []; // Min heap for DOWN direction
  private oppositeDirectionRequests: number[] = []; // Track requests in opposite direction

  constructor(id: number) {
    this.id = id;
    this.display = new Display();
    this.currentFloor = 1;
    this.direction = Direction.UP;
    this.status = Status.IDLE;
    this.internalButton = new InternalButton();
  }

  // Add request to appropriate queue based on direction
  addRequest(floor: number, direction: Direction): void {
    if (direction === Direction.UP) {
      this.addToUpQueue(floor);
    } else {
      this.addToDownQueue(floor);
    }
  }

  private addToUpQueue(floor: number): void {
    if (!this.upRequests.includes(floor)) {
      this.upRequests.push(floor);
      this.upRequests.sort((a, b) => a - b); // Min heap for UP direction
    }
  }

  private addToDownQueue(floor: number): void {
    if (!this.downRequests.includes(floor)) {
      this.downRequests.push(floor);
      this.downRequests.sort((a, b) => b - a); // Max heap for DOWN direction
    }
  }

  // TASK Algorithm: Process requests efficiently
  processRequests(): void {
    if (this.status === Status.IDLE) {
      this.determineDirection();
    }

    if (this.direction === Direction.UP) {
      this.processUpRequests();
    } else {
      this.processDownRequests();
    }
  }

  private determineDirection(): void {
    // Check if there are requests in current direction
    const hasUpRequests =
      this.upRequests.length > 0 &&
      this.upRequests.some((floor) => floor >= this.currentFloor);
    const hasDownRequests =
      this.downRequests.length > 0 &&
      this.downRequests.some((floor) => floor <= this.currentFloor);

    if (hasUpRequests) {
      this.direction = Direction.UP;
    } else if (hasDownRequests) {
      this.direction = Direction.DOWN;
    } else {
      // No requests in current direction, check opposite direction
      if (this.upRequests.length > 0) {
        this.direction = Direction.UP;
      } else if (this.downRequests.length > 0) {
        this.direction = Direction.DOWN;
      }
    }
  }

  private processUpRequests(): void {
    this.status = Status.MOVING;

    // Process requests going UP
    while (
      this.upRequests.length > 0 &&
      this.upRequests[0] >= this.currentFloor
    ) {
      const targetFloor = this.upRequests.shift()!;
      this.moveToFloor(targetFloor);
    }

    // If no more UP requests, check if we need to change direction
    if (this.upRequests.length === 0 && this.downRequests.length > 0) {
      this.direction = Direction.DOWN;
    }
  }

  private processDownRequests(): void {
    this.status = Status.MOVING;

    // Process requests going DOWN
    while (
      this.downRequests.length > 0 &&
      this.downRequests[0] <= this.currentFloor
    ) {
      const targetFloor = this.downRequests.shift()!;
      this.moveToFloor(targetFloor);
    }

    // If no more DOWN requests, check if we need to change direction
    if (this.downRequests.length === 0 && this.upRequests.length > 0) {
      this.direction = Direction.UP;
    }
  }

  private moveToFloor(targetFloor: number): void {
    console.log(
      `Elevator ${this.id} moving from floor ${this.currentFloor} to floor ${targetFloor}`
    );

    // Simulate movement
    this.currentFloor = targetFloor;
    this.display.currentFloor = this.currentFloor;
    this.display.direction = this.direction;

    console.log(`Elevator ${this.id} arrived at floor ${this.currentFloor}`);
  }

  // Check if elevator is idle
  isIdle(): boolean {
    return this.upRequests.length === 0 && this.downRequests.length === 0;
  }

  // Get next destination based on TASK algorithm
  getNextDestination(): number | null {
    if (this.direction === Direction.UP && this.upRequests.length > 0) {
      return this.upRequests[0];
    } else if (
      this.direction === Direction.DOWN &&
      this.downRequests.length > 0
    ) {
      return this.downRequests[0];
    }
    return null;
  }

  // Get elevator status for display
  getStatus(): { floor: number; direction: Direction; status: Status } {
    return {
      floor: this.currentFloor,
      direction: this.direction,
      status: this.status,
    };
  }
}

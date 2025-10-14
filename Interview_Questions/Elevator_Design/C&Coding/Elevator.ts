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

  constructor(id: number) {
    this.id = id;
    this.display = new Display();
    this.currentFloor = 1;
    this.direction = Direction.UP;
    this.status = Status.IDLE;
    this.internalButton = new InternalButton(id, null!); // Will be set by controller
  }

  // Basic getters and setters - no business logic
  getId(): number {
    return this.id;
  }

  getCurrentFloor(): number {
    return this.currentFloor;
  }

  setCurrentFloor(floor: number): void {
    this.currentFloor = floor;
    this.display.currentFloor = floor;
  }

  getDirection(): Direction {
    return this.direction;
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
    this.display.direction = direction;
  }

  getStatus(): Status {
    return this.status;
  }

  setStatus(status: Status): void {
    this.status = status;
  }

  getDisplay(): Display {
    return this.display;
  }

  getInternalButton(): InternalButton {
    return this.internalButton;
  }

  setInternalButton(internalButton: InternalButton): void {
    this.internalButton = internalButton;
  }

  // Simple movement method - just updates position
  moveToFloor(targetFloor: number): void {
    this.currentFloor = targetFloor;
    this.display.currentFloor = targetFloor;
  }
}

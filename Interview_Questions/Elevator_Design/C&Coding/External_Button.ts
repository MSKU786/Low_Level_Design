import { Direction } from './enum';
import { ElevatorController } from './ElevatorController';

export class ExternalButton {
  private floor: number;
  private dispatcher: ExternalButtonDispatcher;

  constructor(floor: number, dispatcher: ExternalButtonDispatcher) {
    this.floor = floor;
    this.dispatcher = dispatcher;
  }

  // Press UP button
  pressUpButton(): void {
    console.log(`UP button pressed on floor ${this.floor}`);
    this.dispatcher.submitRequest(this.floor, Direction.UP);
  }

  // Press DOWN button
  pressDownButton(): void {
    console.log(`DOWN button pressed on floor ${this.floor}`);
    this.dispatcher.submitRequest(this.floor, Direction.DOWN);
  }

  getFloor(): number {
    return this.floor;
  }
}

export class ExternalButtonDispatcher {
  private elevatorController: ElevatorController;

  constructor(elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }

  // Submit external request using TASK algorithm
  submitRequest(floor: number, direction: Direction): void {
    console.log(
      `External request submitted: Floor ${floor}, Direction ${direction}`
    );
    this.elevatorController.acceptRequest(floor, direction);
  }

  // Get elevator controller
  getElevatorController(): ElevatorController {
    return this.elevatorController;
  }
}

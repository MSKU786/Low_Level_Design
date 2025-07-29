import { ElevatorController } from './ElevatorController';

export class InternalButton {
  private elevatorId: number;
  private dispatcher: InternalButtonDispatcher;

  constructor(elevatorId: number, dispatcher: InternalButtonDispatcher) {
    this.elevatorId = elevatorId;
    this.dispatcher = dispatcher;
  }

  // Press button for specific floor
  pressButton(floor: number): void {
    console.log(
      `Internal button pressed: Elevator ${this.elevatorId}, Floor ${floor}`
    );
    this.dispatcher.submitRequest(this.elevatorId, floor);
  }

  getElevatorId(): number {
    return this.elevatorId;
  }
}

export class InternalButtonDispatcher {
  private elevatorController: ElevatorController;

  constructor(elevatorController: ElevatorController) {
    this.elevatorController = elevatorController;
  }

  // Submit internal request using TASK algorithm
  submitRequest(elevatorId: number, floor: number): void {
    console.log(
      `Internal request submitted: Elevator ${elevatorId}, Floor ${floor}`
    );
    this.elevatorController.acceptInternalRequest(elevatorId, floor);
  }

  // Get elevator controller
  getElevatorController(): ElevatorController {
    return this.elevatorController;
  }
}

import { ElevatorController } from './ElevatorController';

export class InternalButton {
  dispatcher: InternalButtonDispatcer;
  pressButton() {}
}

export class InternalButtonDispatcer {
  elevatorController: ElevatorController[];

  submitRequest() {}
}

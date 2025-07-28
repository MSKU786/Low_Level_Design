import { Display } from './Display';
import { Direction, Status } from './enum';
import { InternalButton } from './Internal_Button';

export class Elevator {
  id: number;
  display: Display;
  currentFloor: number;
  direction: Direction;
  status: Status;
  interalButton: InternalButton;

  move(destinationFloor: number, direction: Direction) {}
}

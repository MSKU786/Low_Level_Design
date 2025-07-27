import { Display } from './Display';
import { Direction, Status } from './enum';

export class Elevator {
  display: Display;
  currentFloor: number;
  direction: Direction;
  status: Status;
  interalButton: any;

  move(destinationFloor: number, direction: Direction) {}
}

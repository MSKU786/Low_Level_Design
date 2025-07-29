import { Elevator } from './Elevator';
import { Direction, Status } from './enum';

export class ElevatorController {
  private elevators: Elevator[] = [];
  private externalRequests: Array<{ floor: number; direction: Direction }> = [];
  private internalRequests: Array<{ elevatorId: number; floor: number }> = [];

  constructor(elevatorCount: number = 4) {
    // Initialize multiple elevators
    for (let i = 1; i <= elevatorCount; i++) {
      this.elevators.push(new Elevator(i));
    }
  }

  // Accept external button request (from floor buttons)
  acceptRequest(floor: number, direction: Direction): void {
    console.log(`External request: Floor ${floor}, Direction ${direction}`);

    // Find the best elevator using TASK algorithm
    const bestElevator = this.findBestElevator(floor, direction);

    if (bestElevator) {
      bestElevator.addRequest(floor, direction);
      console.log(`Assigned to Elevator ${bestElevator.id}`);
    }
  }

  // Accept internal button request (from inside elevator)
  acceptInternalRequest(elevatorId: number, floor: number): void {
    console.log(`Internal request: Elevator ${elevatorId}, Floor ${floor}`);

    const elevator = this.elevators.find((e) => e.id === elevatorId);
    if (elevator) {
      // For internal requests, we don't specify direction as it's determined by current direction
      elevator.addRequest(floor, elevator.direction);
    }
  }

  // TASK Algorithm: Find the best elevator for a request
  private findBestElevator(
    floor: number,
    direction: Direction
  ): Elevator | null {
    let bestElevator: Elevator | null = null;
    let minScore = Infinity;

    for (const elevator of this.elevators) {
      const score = this.calculateElevatorScore(elevator, floor, direction);

      if (score < minScore) {
        minScore = score;
        bestElevator = elevator;
      }
    }

    return bestElevator;
  }

  // Calculate score for elevator selection (TASK algorithm)
  private calculateElevatorScore(
    elevator: Elevator,
    floor: number,
    direction: Direction
  ): number {
    const status = elevator.getStatus();
    const distance = Math.abs(status.floor - floor);

    // Base score is distance
    let score = distance;

    // Bonus for idle elevators
    if (status.status === Status.IDLE) {
      score -= 10;
    }

    // Bonus for elevators going in the same direction
    if (status.direction === direction) {
      score -= 5;
    }

    // Bonus for elevators already at the requested floor
    if (status.floor === floor) {
      score -= 20;
    }

    // Penalty for elevators going in opposite direction
    if (status.direction !== direction && status.status === Status.MOVING) {
      score += 15;
    }

    return score;
  }

  // Control all elevators
  controlElevators(): void {
    for (const elevator of this.elevators) {
      elevator.processRequests();
    }
  }

  // Get status of all elevators
  getAllElevatorStatus(): Array<{
    id: number;
    floor: number;
    direction: Direction;
    status: Status;
  }> {
    return this.elevators.map((elevator) => {
      const status = elevator.getStatus();
      return {
        id: elevator.id,
        floor: status.floor,
        direction: status.direction,
        status: status.status,
      };
    });
  }

  // Get specific elevator
  getElevator(id: number): Elevator | undefined {
    return this.elevators.find((e) => e.id === id);
  }

  // Get all elevators
  getElevators(): Elevator[] {
    return this.elevators;
  }

  // Check if any elevator is busy
  isAnyElevatorBusy(): boolean {
    return this.elevators.some((elevator) => !elevator.isIdle());
  }

  // Get elevators that are idle
  getIdleElevators(): Elevator[] {
    return this.elevators.filter((elevator) => elevator.isIdle());
  }
}

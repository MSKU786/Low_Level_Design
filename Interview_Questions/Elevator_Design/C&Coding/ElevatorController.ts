import { Elevator } from './Elevator';
import { Direction, Status } from './enum';
import { InternalButtonDispatcher } from './Internal_Button';

export class ElevatorController {
  private elevators: Elevator[] = [];
  private internalButtonDispatcher: InternalButtonDispatcher;

  // Simplified TASK Algorithm: Using arrays with built-in sort
  private upRequests: Map<number, number[]> = new Map(); // Elevator ID -> UP requests
  private downRequests: Map<number, number[]> = new Map(); // Elevator ID -> DOWN requests

  constructor(elevatorCount: number = 4) {
    // Initialize multiple elevators
    for (let i = 1; i <= elevatorCount; i++) {
      const elevator = new Elevator(i);
      this.elevators.push(elevator);

      // Initialize request arrays for each elevator
      this.upRequests.set(i, []);
      this.downRequests.set(i, []);
    }

    // Initialize internal button dispatcher
    this.internalButtonDispatcher = new InternalButtonDispatcher(this);
  }

  // Accept external button request (from floor buttons)
  acceptRequest(floor: number, direction: Direction): void {
    console.log(`External request: Floor ${floor}, Direction ${direction}`);

    // Find the best elevator using simplified TASK algorithm
    const bestElevator = this.findBestElevator(floor, direction);

    if (bestElevator) {
      this.addRequestToElevator(bestElevator.getId(), floor, direction);
      console.log(`Assigned to Elevator ${bestElevator.getId()}`);
    }
  }

  // Accept internal button request (from inside elevator)
  acceptInternalRequest(elevatorId: number, floor: number): void {
    console.log(`Internal request: Elevator ${elevatorId}, Floor ${floor}`);

    const elevator = this.getElevator(elevatorId);
    if (elevator) {
      // For internal requests, use current elevator direction
      this.addRequestToElevator(elevatorId, floor, elevator.getDirection());
    }
  }

  // Add request to specific elevator's queue
  private addRequestToElevator(
    elevatorId: number,
    floor: number,
    direction: Direction
  ): void {
    if (direction === Direction.UP) {
      this.addToUpQueue(elevatorId, floor);
    } else {
      this.addToDownQueue(elevatorId, floor);
    }
  }

  private addToUpQueue(elevatorId: number, floor: number): void {
    const requests = this.upRequests.get(elevatorId) || [];
    if (!requests.includes(floor)) {
      requests.push(floor);
      // Sort ascending for UP direction (built-in sort)
      requests.sort((a, b) => a - b);
      this.upRequests.set(elevatorId, requests);
    }
  }

  private addToDownQueue(elevatorId: number, floor: number): void {
    const requests = this.downRequests.get(elevatorId) || [];
    if (!requests.includes(floor)) {
      requests.push(floor);
      // Sort descending for DOWN direction (built-in sort)
      requests.sort((a, b) => b - a);
      this.downRequests.set(elevatorId, requests);
    }
  }

  // Simplified TASK Algorithm: Find the best elevator for a request
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

  // Simplified scoring algorithm
  private calculateElevatorScore(
    elevator: Elevator,
    floor: number,
    direction: Direction
  ): number {
    const currentFloor = elevator.getCurrentFloor();
    const currentDirection = elevator.getDirection();
    const currentStatus = elevator.getStatus();
    const distance = Math.abs(currentFloor - floor);

    // Simple scoring: distance + bonuses/penalties
    let score = distance;

    // Bonus for idle elevators
    if (currentStatus === Status.IDLE) {
      score -= 10;
    }

    // Bonus for elevators going in the same direction
    if (currentDirection === direction) {
      score -= 5;
    }

    // Bonus for elevators already at the requested floor
    if (currentFloor === floor) {
      score -= 20;
    }

    // Penalty for elevators going in opposite direction
    if (currentDirection !== direction && currentStatus === Status.MOVING) {
      score += 15;
    }

    return score;
  }

  // Control all elevators using simplified TASK algorithm
  controlElevators(): void {
    for (const elevator of this.elevators) {
      this.processElevatorRequests(elevator);
    }
  }

  // Process requests for a specific elevator
  private processElevatorRequests(elevator: Elevator): void {
    const elevatorId = elevator.getId();
    const upRequests = this.upRequests.get(elevatorId) || [];
    const downRequests = this.downRequests.get(elevatorId) || [];

    if (elevator.getStatus() === Status.IDLE) {
      this.determineElevatorDirection(elevator);
    }

    if (elevator.getDirection() === Direction.UP) {
      this.processUpRequests(elevator);
    } else {
      this.processDownRequests(elevator);
    }
  }

  private determineElevatorDirection(elevator: Elevator): void {
    const elevatorId = elevator.getId();
    const upRequests = this.upRequests.get(elevatorId) || [];
    const downRequests = this.downRequests.get(elevatorId) || [];
    const currentFloor = elevator.getCurrentFloor();

    // Check if there are requests in current direction
    const hasUpRequests =
      upRequests.length > 0 &&
      upRequests.some((floor) => floor >= currentFloor);
    const hasDownRequests =
      downRequests.length > 0 &&
      downRequests.some((floor) => floor <= currentFloor);

    if (hasUpRequests) {
      elevator.setDirection(Direction.UP);
    } else if (hasDownRequests) {
      elevator.setDirection(Direction.DOWN);
    } else {
      // No requests in current direction, check opposite direction
      if (upRequests.length > 0) {
        elevator.setDirection(Direction.UP);
      } else if (downRequests.length > 0) {
        elevator.setDirection(Direction.DOWN);
      }
    }
  }

  private processUpRequests(elevator: Elevator): void {
    const elevatorId = elevator.getId();
    const upRequests = this.upRequests.get(elevatorId) || [];
    const downRequests = this.downRequests.get(elevatorId) || [];
    const currentFloor = elevator.getCurrentFloor();

    elevator.setStatus(Status.MOVING);

    // Process requests going UP (using built-in array methods)
    while (upRequests.length > 0 && upRequests[0] >= currentFloor) {
      const targetFloor = upRequests.shift()!;
      this.moveElevatorToFloor(elevator, targetFloor);
    }

    // Update the queue
    this.upRequests.set(elevatorId, upRequests);

    // If no more UP requests, check if we need to change direction
    if (upRequests.length === 0 && downRequests.length > 0) {
      elevator.setDirection(Direction.DOWN);
    }
  }

  private processDownRequests(elevator: Elevator): void {
    const elevatorId = elevator.getId();
    const upRequests = this.upRequests.get(elevatorId) || [];
    const downRequests = this.downRequests.get(elevatorId) || [];
    const currentFloor = elevator.getCurrentFloor();

    elevator.setStatus(Status.MOVING);

    // Process requests going DOWN (using built-in array methods)
    while (downRequests.length > 0 && downRequests[0] <= currentFloor) {
      const targetFloor = downRequests.shift()!;
      this.moveElevatorToFloor(elevator, targetFloor);
    }

    // Update the queue
    this.downRequests.set(elevatorId, downRequests);

    // If no more DOWN requests, check if we need to change direction
    if (downRequests.length === 0 && upRequests.length > 0) {
      elevator.setDirection(Direction.UP);
    }
  }

  private moveElevatorToFloor(elevator: Elevator, targetFloor: number): void {
    console.log(
      `Elevator ${elevator.getId()} moving from floor ${elevator.getCurrentFloor()} to floor ${targetFloor}`
    );

    // Move elevator
    elevator.moveToFloor(targetFloor);

    console.log(
      `Elevator ${elevator.getId()} arrived at floor ${elevator.getCurrentFloor()}`
    );
  }

  // Check if any elevator is busy
  isAnyElevatorBusy(): boolean {
    return this.elevators.some((elevator) => !this.isElevatorIdle(elevator));
  }

  // Check if specific elevator is idle
  private isElevatorIdle(elevator: Elevator): boolean {
    const elevatorId = elevator.getId();
    const upRequests = this.upRequests.get(elevatorId) || [];
    const downRequests = this.downRequests.get(elevatorId) || [];
    return upRequests.length === 0 && downRequests.length === 0;
  }

  // Get status of all elevators
  getAllElevatorStatus(): Array<{
    id: number;
    floor: number;
    direction: Direction;
    status: Status;
  }> {
    return this.elevators.map((elevator) => ({
      id: elevator.getId(),
      floor: elevator.getCurrentFloor(),
      direction: elevator.getDirection(),
      status: elevator.getStatus(),
    }));
  }

  // Get specific elevator
  getElevator(id: number): Elevator | undefined {
    return this.elevators.find((e) => e.getId() === id);
  }

  // Get all elevators
  getElevators(): Elevator[] {
    return this.elevators;
  }

  // Get elevators that are idle
  getIdleElevators(): Elevator[] {
    return this.elevators.filter((elevator) => this.isElevatorIdle(elevator));
  }

  // Get internal button dispatcher
  getInternalButtonDispatcher(): InternalButtonDispatcher {
    return this.internalButtonDispatcher;
  }

  // Get next destination for an elevator
  getNextDestination(elevatorId: number): number | null {
    const elevator = this.getElevator(elevatorId);
    if (!elevator) return null;

    const direction = elevator.getDirection();
    const requests =
      direction === Direction.UP
        ? this.upRequests.get(elevatorId) || []
        : this.downRequests.get(elevatorId) || [];

    return requests.length > 0 ? requests[0] : null;
  }
}

import { Floor } from './Floor';
import { ElevatorController } from './ElevatorController';
import { ExternalButtonDispatcher } from './External_Button';
import { InternalButton, InternalButtonDispatcher } from './Internal_Button';

export class Building {
  id: string;
  name: string;
  address: string;
  floors: Floor[];
  private elevatorController: ElevatorController;
  private externalButtonDispatcher: ExternalButtonDispatcher;
  private internalButtonDispatcher: InternalButtonDispatcher;

  constructor(
    id: string,
    name: string,
    address: string,
    floorCount: number = 10,
    elevatorCount: number = 4
  ) {
    this.id = id;
    this.name = name;
    this.address = address;

    // Initialize elevator controller with TASK algorithm
    this.elevatorController = new ElevatorController(elevatorCount);
    this.externalButtonDispatcher = new ExternalButtonDispatcher(
      this.elevatorController
    );
    this.internalButtonDispatcher =
      this.elevatorController.getInternalButtonDispatcher();

    // Initialize floors
    this.floors = [];
    for (let i = 1; i <= floorCount; i++) {
      this.floors.push(new Floor(i, this.externalButtonDispatcher));
    }

    // Set up internal buttons for all elevators
    this.setupInternalButtons();
  }

  // Set up internal buttons for all elevators
  private setupInternalButtons(): void {
    const elevators = this.elevatorController.getElevators();
    for (const elevator of elevators) {
      const internalButton = new InternalButton(
        elevator.getId(),
        this.internalButtonDispatcher
      );
      elevator.setInternalButton(internalButton);
    }
  }

  // Get elevator controller
  getElevatorController(): ElevatorController {
    return this.elevatorController;
  }

  // Get external button dispatcher
  getExternalButtonDispatcher(): ExternalButtonDispatcher {
    return this.externalButtonDispatcher;
  }

  // Get internal button dispatcher
  getInternalButtonDispatcher(): InternalButtonDispatcher {
    return this.internalButtonDispatcher;
  }

  // Get all floors
  getFloors(): Floor[] {
    return this.floors;
  }

  // Get specific floor
  getFloor(floorNumber: number): Floor | undefined {
    return this.floors.find((floor) => floor.getId() === floorNumber);
  }

  // Get building info
  getBuildingInfo(): {
    id: string;
    name: string;
    address: string;
    floorCount: number;
  } {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      floorCount: this.floors.length,
    };
  }
}

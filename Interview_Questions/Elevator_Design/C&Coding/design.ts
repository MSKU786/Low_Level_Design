import { Building } from './Building';
import { Direction } from './enum';

// TASK Algorithm Demo
class ElevatorSystemDemo {
  private building: Building;

  constructor() {
    // Create a building with 10 floors and 4 elevators
    this.building = new Building(
      'B001',
      'Tech Tower',
      '123 Innovation St',
      10,
      4
    );
  }

  // Demo the TASK algorithm with various scenarios
  async runDemo(): Promise<void> {
    console.log('🚀 Starting TASK Algorithm Elevator System Demo');
    console.log('==============================================\n');

    // Show initial status
    this.showAllElevatorStatus();

    // Scenario 1: Multiple external requests
    console.log('\n📋 Scenario 1: Multiple External Requests');
    console.log('-------------------------------------------');

    // External requests from different floors
    this.simulateExternalRequest(3, Direction.UP);
    this.simulateExternalRequest(7, Direction.DOWN);
    this.simulateExternalRequest(1, Direction.UP);
    this.simulateExternalRequest(9, Direction.DOWN);

    await this.processRequests();

    // Scenario 2: Internal requests
    console.log('\n📋 Scenario 2: Internal Requests');
    console.log('----------------------------------');

    // Internal requests from inside elevators
    this.simulateInternalRequest(1, 5);
    this.simulateInternalRequest(2, 8);
    this.simulateInternalRequest(3, 2);

    await this.processRequests();

    // Scenario 3: Complex scenario with mixed requests
    console.log('\n📋 Scenario 3: Complex Mixed Requests');
    console.log('----------------------------------------');

    this.simulateExternalRequest(4, Direction.UP);
    this.simulateExternalRequest(6, Direction.DOWN);
    this.simulateInternalRequest(1, 10);
    this.simulateInternalRequest(4, 1);

    await this.processRequests();

    // Show final status
    console.log('\n📊 Final Status');
    console.log('---------------');
    this.showAllElevatorStatus();
  }

  // Simulate external button press
  private simulateExternalRequest(floor: number, direction: Direction): void {
    console.log(`🔘 External Request: Floor ${floor}, Direction ${direction}`);
    const floorObj = this.building.getFloor(floor);
    if (floorObj) {
      if (direction === Direction.UP) {
        floorObj.getButton().pressUpButton();
      } else {
        floorObj.getButton().pressDownButton();
      }
    }
  }

  // Simulate internal button press
  private simulateInternalRequest(elevatorId: number, floor: number): void {
    console.log(`🔘 Internal Request: Elevator ${elevatorId}, Floor ${floor}`);
    this.building
      .getInternalButtonDispatcher()
      .submitRequest(elevatorId, floor);
  }

  // Process all requests using TASK algorithm
  private async processRequests(): Promise<void> {
    console.log('\n⚙️  Processing requests with TASK algorithm...');

    const controller = this.building.getElevatorController();
    let iterations = 0;
    const maxIterations = 20;

    while (controller.isAnyElevatorBusy() && iterations < maxIterations) {
      controller.controlElevators();
      this.showAllElevatorStatus();
      iterations++;

      // Simulate time delay
      await this.delay(1000);
    }
  }

  // Show status of all elevators
  private showAllElevatorStatus(): void {
    const controller = this.building.getElevatorController();
    const statuses = controller.getAllElevatorStatus();

    console.log('\n📊 Elevator Status:');
    console.log('-------------------');

    statuses.forEach((status) => {
      const directionSymbol = status.direction === 'UP' ? '⬆️' : '⬇️';
      const statusSymbol = status.status === 0 ? '🟢' : '🟡';
      console.log(
        `${statusSymbol} Elevator ${status.id}: Floor ${
          status.floor
        } ${directionSymbol} (${status.status === 0 ? 'IDLE' : 'MOVING'})`
      );
    });
  }

  // Utility function for delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get building information
  getBuildingInfo(): void {
    const info = this.building.getBuildingInfo();
    console.log('\n🏢 Building Information:');
    console.log('------------------------');
    console.log(`Building ID: ${info.id}`);
    console.log(`Name: ${info.name}`);
    console.log(`Address: ${info.address}`);
    console.log(`Total Floors: ${info.floorCount}`);
  }
}

// TASK Algorithm Explanation
class TASKAlgorithmExplanation {
  static explain(): void {
    console.log('\n🧠 TASK Algorithm Explanation');
    console.log('============================');
    console.log('TASK (Three Algorithm Scheduling with K) uses:');
    console.log('1. Max Priority Queue: For UP direction requests');
    console.log('2. Min Priority Queue: For DOWN direction requests');
    console.log(
      '3. Opposite Direction Array: To track requests in opposite direction'
    );
    console.log('');
    console.log('Key Features:');
    console.log('✅ Efficient request distribution using priority queues');
    console.log(
      '✅ Optimal elevator selection based on distance and direction'
    );
    console.log('✅ Handles both external and internal requests');
    console.log('✅ Supports multiple elevators with intelligent dispatching');
    console.log('✅ Minimizes wait time and travel distance');
    console.log('');
    console.log('Architecture:');
    console.log(
      '🎯 Elevator: Dumb object with only properties and basic getters/setters'
    );
    console.log(
      '🎯 ElevatorController: Contains all TASK algorithm logic and business rules'
    );
    console.log('🎯 Building: Orchestrates the entire system');
  }
}

// Run the demo
async function main(): Promise<void> {
  const demo = new ElevatorSystemDemo();

  // Show building information
  demo.getBuildingInfo();

  // Show TASK algorithm explanation
  TASKAlgorithmExplanation.explain();

  // Run the demo
  await demo.runDemo();

  console.log('\n✅ TASK Algorithm Demo Completed!');
}

// Export for use in other files
export { ElevatorSystemDemo, TASKAlgorithmExplanation };

// Run the demo
main().catch(console.error);

import { ParkingSpot } from './ParkingSpot';
import { ParkingSpotManagerFactory } from './ParkingSpotManagerFactory';
import { ParkingSpotManager } from './ParkingSpotManger';
import { Ticket } from './Ticket';
import { Vehicle } from './Vehicle';

export class EntranceGate {
  private factory: ParkingSpotManagerFactory;
  private parkingSpotManager: ParkingSpotManager | null;
  private ticket: Ticket | null;

  constructor() {
    this.factory = new ParkingSpotManagerFactory();
  }

  findParkingSpace(vehicle: Vehicle): ParkingSpot | null {
    this.parkingSpotManager =
      ParkingSpotManagerFactory.getParkingSpotManager(vehicle);
    if (this.parkingSpotManager)
      return this.parkingSpotManager.findParkingSpot();
    return null;
  }
}

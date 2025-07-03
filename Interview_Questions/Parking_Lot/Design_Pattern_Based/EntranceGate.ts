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

  //Book a slot for the vehicle and return the parking slot

  bookSlot(vehcile: Vehicle): ParkingSpot {
    if (!this.parkingSpotManager) {
      throw new Error('Must Find parking space first');
    }

    const spot = this.findParkingSpace(vehcile);
    if (!spot) {
      throw new Error('No parking spot available');
    }

    this.parkingSpotManager.parkVehicle(vehcile, spot);
    return spot;
  }

  // Generate a ticket for parked vehcile
  generateTicket(vehcile: Vehicle, parkingSpot: ParkingSpot): Ticket {
    this.ticket = new Ticket(new Date(), vehcile, parkingSpot);
    return this.ticket;
  }

  // Complete entrance process (combines all steps)
  public vehicleEnter(vehicle: Vehicle): Ticket {
    const spot = this.bookSlot(vehicle);
    return this.generateTicket(vehicle, spot);
  }
}

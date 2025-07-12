import { Vehicle, VehicleType } from './Vehicle';
import { Ticket } from './Ticket';
import { EntranceGate } from './EntranceGate';
import { ExitGate } from './ExitGate';
import { ParkingSpotManagerFactory } from './ParkingSpotManagerFactory';

export class ParkingLot {
  private entranceGate: EntranceGate;
  private exitGate: ExitGate;
  private activeTickets: Map<string, Ticket> = new Map();

  constructor() {
    this.entranceGate = new EntranceGate();
    this.exitGate = new ExitGate();

    // Initialize parking spots
    ParkingSpotManagerFactory.initializeParkingSpots(10, 20);
  }

  // Vehicle entry process
  vehicleEntry(vehicle: Vehicle): Ticket | null {
    try {
      console.log(
        `Vehicle ${
          vehicle.vehicleNo
        } (${vehicle.getVehicleType()}) entering parking lot...`
      );

      const ticket = this.entranceGate.vehicleEnter(vehicle);
      this.activeTickets.set(vehicle.vehicleNo, ticket);

      console.log(
        `Vehicle ${vehicle.vehicleNo} parked successfully at spot ${ticket.parkingSpot.id}`
      );
      console.log(
        `Ticket generated: Entry time ${ticket.entryTime.toLocaleString()}`
      );

      return ticket;
    } catch (error) {
      console.error(`Failed to park vehicle ${vehicle.vehicleNo}:`, error);
      return null;
    }
  }

  // Vehicle exit process
  vehicleExit(
    vehicleNo: string,
    paymentMethod: 'cash' | 'card' | 'upi' = 'cash'
  ): boolean {
    try {
      const ticket = this.activeTickets.get(vehicleNo);
      if (!ticket) {
        throw new Error(`No active ticket found for vehicle ${vehicleNo}`);
      }

      console.log(`Vehicle ${vehicleNo} exiting parking lot...`);

      const success = this.exitGate.vehicleExit(ticket, paymentMethod);
      if (success) {
        this.activeTickets.delete(vehicleNo);
        console.log(`Vehicle ${vehicleNo} successfully exited`);
      }

      return success;
    } catch (error) {
      console.error(`Failed to exit vehicle ${vehicleNo}:`, error);
      return false;
    }
  }

  // Get parking status
  getParkingStatus(): void {
    console.log('\n=== PARKING LOT STATUS ===');
    console.log(
      `Two-wheeler spots: ${ParkingSpotManagerFactory.getAvailableSpots(
        VehicleType.TWO_WHEELER
      )}/${ParkingSpotManagerFactory.getTotalSpots(
        VehicleType.TWO_WHEELER
      )} available`
    );
    console.log(
      `Four-wheeler spots: ${ParkingSpotManagerFactory.getAvailableSpots(
        VehicleType.FOUR_WHEELER
      )}/${ParkingSpotManagerFactory.getTotalSpots(
        VehicleType.FOUR_WHEELER
      )} available`
    );
    console.log(`Active vehicles: ${this.activeTickets.size}`);
    console.log('========================\n');
  }

  // Get ticket information
  getTicketInfo(vehicleNo: string): Ticket | null {
    return this.activeTickets.get(vehicleNo) || null;
  }

  // Get all active tickets
  getAllActiveTickets(): Ticket[] {
    return Array.from(this.activeTickets.values());
  }

  // Check if vehicle is parked
  isVehicleParked(vehicleNo: string): boolean {
    return this.activeTickets.has(vehicleNo);
  }
}

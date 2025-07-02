import { Vehicle } from './Vehicle';
import { ParkingSpot } from './ParkingSpot';
export class Ticket {
  entryTime: number;
  vehicle: Vehicle;
  parkingSpot: ParkingSpot;

  constructor(entryTime: number, vehicle: Vehicle, parkingSpot: ParkingSpot) {
    this.entryTime = entryTime;
    this.vehicle = vehicle;
    this.parkingSpot = parkingSpot;
  }
}

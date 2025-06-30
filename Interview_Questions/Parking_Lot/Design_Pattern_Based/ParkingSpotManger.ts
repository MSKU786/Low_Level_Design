import { ParkingSpot } from './ParkingSpot';

abstract class ParkingSpotManager {
  parkingSpot: ParkingSpot[];

  constructor(parkingSpot: ParkingSpot[]) {
    this.parkingSpot = parkingSpot;
  }
}

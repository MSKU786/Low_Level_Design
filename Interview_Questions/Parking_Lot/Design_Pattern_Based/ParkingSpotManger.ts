import { ParkingSpot } from './ParkingSpot';
import { Vehicle } from './Vehicle';

export abstract class ParkingSpotManager {
  parkingSpot: ParkingSpot[];

  constructor(parkingSpot: ParkingSpot[]) {
    this.parkingSpot = parkingSpot;
  }

  abstract findParkingSpot(): ParkingSpot | null;

  parkVehicle(v: Vehicle, spot: ParkingSpot): void {
    if (spot) {
      spot.parkVehicle(v);
    } else;
    throw new Error('No parking spot available');
  }

  removeVehicle(v: Vehicle): void {
    for (let spot of this.parkingSpot) {
      if (spot.vehcile != null && spot.vehcile == v) {
        spot.removeVehicle();
      }
    }
  }
}

export class TwoWheelerParkingSpotManager extends ParkingSpotManager {
  findParkingSpot(): ParkingSpot | null {
    for (let spot of this.parkingSpot) {
      if (spot.vehcile == null) {
        return spot;
      }
    }
    return null;
  }
}

export class FourWheelerParkingSpotManager extends ParkingSpotManager {
  findParkingSpot(): ParkingSpot | null {
    for (let spot of this.parkingSpot) {
      if (spot.vehcile == null) {
        return spot;
      }
    }
    return null;
  }
}

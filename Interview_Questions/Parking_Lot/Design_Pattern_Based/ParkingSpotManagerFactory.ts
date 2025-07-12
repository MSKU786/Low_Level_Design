import { Vehicle, VehicleType } from './Vehicle';
import {
  FourWheelerParkingSpotManager,
  ParkingSpotManager,
  TwoWheelerParkingSpotManager,
} from './ParkingSpotManger';
import { ParkingSpot } from './ParkingSpot';

export class ParkingSpotManagerFactory {
  private static twoWheelerSpots: ParkingSpot[] = [];
  private static fourWheelerSpots: ParkingSpot[] = [];

  // Initialize parking spots
  static initializeParkingSpots(
    twoWheelerCount: number = 10,
    fourWheelerCount: number = 20
  ): void {
    // Initialize two-wheeler spots
    for (let i = 1; i <= twoWheelerCount; i++) {
      this.twoWheelerSpots.push(new ParkingSpot(`TW-${i}`, 5)); // $5 per hour for two-wheelers
    }

    // Initialize four-wheeler spots
    for (let i = 1; i <= fourWheelerCount; i++) {
      this.fourWheelerSpots.push(new ParkingSpot(`FW-${i}`, 10)); // $10 per hour for four-wheelers
    }
  }

  static getParkingSpotManager(vehicle: Vehicle): ParkingSpotManager | null {
    if (vehicle.getVehicleType() == VehicleType.TWO_WHEELER) {
      return new TwoWheelerParkingSpotManager(this.twoWheelerSpots);
    } else if (vehicle.getVehicleType() == VehicleType.FOUR_WHEELER) {
      return new FourWheelerParkingSpotManager(this.fourWheelerSpots);
    }
    return null;
  }

  // Get available spots count
  static getAvailableSpots(vehicleType: VehicleType): number {
    const spots =
      vehicleType === VehicleType.TWO_WHEELER
        ? this.twoWheelerSpots
        : this.fourWheelerSpots;
    return spots.filter((spot) => spot.isEmpty).length;
  }

  // Get total spots count
  static getTotalSpots(vehicleType: VehicleType): number {
    return vehicleType === VehicleType.TWO_WHEELER
      ? this.twoWheelerSpots.length
      : this.fourWheelerSpots.length;
  }
}

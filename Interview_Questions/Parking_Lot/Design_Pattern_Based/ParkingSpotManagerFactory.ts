import { Vehicle, VehicleType } from './Vehicle';
import {
  FourWheelerParkingSpotManager,
  ParkingSpotManager,
  TwoWheelerParkingSpotManager,
} from './ParkingSpotManger';

export class ParkingSpotManagerFactory {
  static getParkingSpotManager(vehicle: Vehicle): ParkingSpotManager | null {
    if (vehicle.getVehicleType() == VehicleType.TWO_WHEELER) {
      return new TwoWheelerParkingSpotManager([]);
    } else if (vehicle.getVehicleType() == VehicleType.FOUR_WHEELER) {
      return new FourWheelerParkingSpotManager([]);
    }
    return null;
  }
}

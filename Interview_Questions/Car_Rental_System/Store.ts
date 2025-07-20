import { Location } from './Location';
import { Reservation } from './Reservation';
import { Vechicles, VehicleTYpe } from './Vehicles';
import { VehicleInventoryManager } from './VehiceleInventoryManager';
import { User } from './User';

export class Store {
  id: string;
  location: Location;
  name: string;
  phoneNumber: string;
  owner: string;
  vehicleInventoryManager: VehicleInventoryManager;
  reservation: Reservation[];

  setVehicle(vechiles: Vechicles[]): void {
    this.vehicleInventoryManager = new VehicleInventoryManager(vechiles);
  }

  getVehicles(vechileType: VehicleTYpe): Vechicles[] {
    return this.vehicleInventoryManager.getVehicles(vechileType);
  }

  createReservation(vehicle: Vechicles, user: User) {}
}

import { Vechicles, VehicleTYpe } from './Vehicles';

export class VehicleInventoryManager {
  vehicles: Vechicles[];

  constructor(vehicles: Vechicles[]) {
    this.vehicles = vehicles;
  }
  getVehicles(vechileType: VehicleTYpe): Vechicles[] {
    return this.vehicles.filter((v) => v.type === vechileType);
  }
}

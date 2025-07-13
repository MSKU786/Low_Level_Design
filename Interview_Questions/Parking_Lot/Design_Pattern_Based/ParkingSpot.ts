import { Vehicle } from './Vehicle';
export class ParkingSpot {
  id: string;
  isEmpty: boolean;
  vehcile: Vehicle | null;
  price: number;

  constructor(id: string, price: number) {
    this.id = id;
    this.price = price;
    this.isEmpty = true;
    this.vehcile = null;
  }

  parkVehicle(v: Vehicle) {
    this.vehcile = v;
    this.isEmpty = false;
  }

  removeVehicle() {
    this.vehcile = null;
    this.isEmpty = true;
  }

  isAvailable(): boolean {
    return this.isEmpty;
  }

  getVehicle(): Vehicle | null {
    return this.vehcile;
  }
}

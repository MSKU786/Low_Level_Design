export class Vehicle {
  vehicleNo: string;
  type: VehicleType;

  constructor(vehicleNo, type) {
    this.vehicleNo = vehicleNo;
    this.type = type;
  }

  getVehicleType(): VehicleType {
    return this.type;
  }
}

export enum VehicleType {
  TWO_WHEELER = '2-Wheeler',
  FOUR_WHEELER = '4-Wheeler',
}

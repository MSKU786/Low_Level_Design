export class Vehicle {
  vehicleNo: string;
  type: VehicleType;

  constructor(vehicleNo, type) {
    this.vehicleNo = vehicleNo;
    this.type = type;
  }
}

export enum VehicleType {
  '2-Wheeler',
  '4-Wheeler',
}

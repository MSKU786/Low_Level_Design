class Spot {
  type: SpotType;
  private isReserved = false;

  isBooked() {
    return this.isReserved;
  }

  bookSlot() {
    this.isReserved = true;
  }

  releaseSlot() {
    this.isReserved = false;
  }
}

enum SpotType {
  '2-W',
  '4-W',
  '8-W',
}

enum VehicleType {
  'Two-Wheeler',
  'Compact',
  'Heavy',
}

class Vehicle {
  type: VehicleType;
  drivingLicense: string;
  number_plate: string;

  constructor(
    private type: VehicleType,
    private drivingLicense: string,
    private number_plate: string,
  ) {}
}

enum VehicleType {
  'BIKE' = 'bike',
  'CAR' = 'car',
  'TRUCK' = 'truck',
}

class Vehcile {
  licenesePlateNo: string;
  type: VehicleType;
  phoneNumber: string;
  name: string;
}

class Ticket {
  id: number;
  vehcile: Vehcile;
  duration: number; // in hours;
  createAt: EpochTimeStamp;

  constructor(v: Vehcile, duration: number) {
    this.vehcile = v;
    this.duration = duration;
  }
}

class ParkingSlot {
  id: string;
  vehicleType: VehicleType;
  occupied: boolean;

  constructor(id: string, type: VehicleType) {
    this.id = id;
    this.vehicleType = type;
    this.occupied = false;
  }

  bookSlot() {
    this.occupied = true;
  }

  isFree() {
    return this.occupied;
  }
}

class ParkingFloor {
  id: number;
  parkingSlots: ParkingSlot[] = [];
  totalSlots: number;
  constructor(numberOfSlots: number) {
    for (let i = 0; i < numberOfSlots; i++) {
      this.parkingSlots.push(
        new ParkingSlot(`${this.id}+_+${i}`, VehicleType.TRUCK)
      );
    }

    this.totalSlots = numberOfSlots;
  }

  isFull() {
    let full = false;
    for (let i = 0; i < this.totalSlots; i++)
      if (this.parkingSlots[i].isFree()) return full;
    return true;
  }
}

class ParkingLot {
  static parkingLotInstance: ParkingLot | null = null;
  parkingFloors: ParkingFloor[] = [];
  totalFloors: number;
  private constructor() {}

  static getInstance(): ParkingLot {
    if (this.parkingLotInstance != null) {
      return this.parkingLotInstance;
    }
    return (this.parkingLotInstance = new ParkingLot());
  }

  addFloor(numberOfSlots) {
    const floor = new ParkingFloor(numberOfSlots);
    this.parkingFloors.push(floor);
    this.totalFloors++;
  }
}

class TicketService {}

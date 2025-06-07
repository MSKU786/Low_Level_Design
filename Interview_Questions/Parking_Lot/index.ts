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
    this.createAt = Date.now();
  }
}

class ParkingSlot {
  id: string;
  vehicleType: VehicleType;
  occupied: boolean;
  vehcile: Vehcile;

  constructor(id: string, type: VehicleType) {
    this.id = id;
    this.vehicleType = type;
    this.occupied = false;
  }

  bookSlot(vehcile: Vehcile) {
    this.vehcile = vehcile;
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
  isPacked: boolean;
  constructor(id: number, numberOfSlots: number) {
    this.id = id;

    for (let i = 0; i < numberOfSlots; i++) {
      this.parkingSlots.push(
        new ParkingSlot(`${this.id}+_+${i}`, VehicleType.TRUCK)
      );
    }

    this.totalSlots = numberOfSlots;
    this.isPacked = false;
  }

  getFreeSlotId(): ParkingSlot | null {
    for (let i = 0; i < this.totalSlots; i++)
      if (this.parkingSlots[i].isFree()) return this.parkingSlots[i];

    return null;
  }

  private isFull() {
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
    const floor = new ParkingFloor(this.totalFloors, numberOfSlots);
    this.parkingFloors.push(floor);
    this.totalFloors++;
  }
}

class TicketService {
  parkingLotInstance = ParkingLot.getInstance();

  generateTicket(vehcile: Vehcile, duration: number = 2) {
    if (!this.checkFreeSlots()) {
      throw new Error('No Slots available');
    }

    let slot: ParkingSlot | null = null;
    for (let floor of this.parkingLotInstance.parkingFloors) {
      if (floor.isPacked) {
        continue;
      }

      slot = floor.getFreeSlotId();
      if (slot) {
        break;
      }
    }
    if (!slot) {
      throw new Error('No free slot found');
    }
    slot.bookSlot(vehcile);
    const ticket = new Ticket(vehcile, duration);
    return ticket;
  }

  private checkFreeSlots() {
    let floors = this.parkingLotInstance.parkingFloors;
    for (let floor of floors) {
      if (!floor.isPacked) return false;
    }
    return true;
  }
}

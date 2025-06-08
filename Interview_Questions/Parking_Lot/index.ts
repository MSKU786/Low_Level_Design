enum VehicleType {
  'BIKE' = 'bike',
  'CAR' = 'car',
  'TRUCK' = 'truck',
}

enum TicketStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const tickets = new Map<number, Ticket>();

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
  createdAt: EpochTimeStamp;
  slot: ParkingSlot;
  status: TicketStatus;

  constructor(v: Vehcile, slot: ParkingSlot, duration: number) {
    this.vehcile = v;
    this.duration = duration;
    this.createdAt = Date.now();
    this.id = Date.now();
    this.slot = slot;
    this.status = TicketStatus.ACTIVE;
  }
}

class ParkingSlot {
  id: string;
  vehicleType: VehicleType | null;
  occupied: boolean;
  vehcile: Vehcile | null;

  constructor(id: string, type: VehicleType) {
    this.id = id;
    this.vehicleType = type;
    this.occupied = false;
  }

  bookSlot(vehcile: Vehcile) {
    this.vehcile = vehcile;
    this.occupied = true;
  }

  releaseSlot() {
    this.vehcile = null;
    this.occupied = false;
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
    const ticket = new Ticket(vehcile, slot, duration);
    tickets.set(ticket.id, ticket);
    return ticket;
  }

  private checkFreeSlots() {
    let floors = this.parkingLotInstance.parkingFloors;
    for (let floor of floors) {
      if (!floor.isPacked) return false;
    }
    return true;
  }

  releaseTicket(id: number) {
    if (tickets.has(id)) {
      const ticket = tickets.get(id);
      // @ts-ignore
      ticket?.status = TicketStatus.INACTIVE;
      const slot = ticket?.slot;
      slot?.releaseSlot();
    }

    throw new Error('Invalid Ticket');
  }
}

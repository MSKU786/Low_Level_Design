class Spot {
  private isReserved = false;

  constructor(private type: SpotType) {}

  isBooked() {
    return this.isReserved;
  }

  bookSlot() {
    this.isReserved = true;
  }

  releaseSlot() {
    this.isReserved = false;
  }

  getType() {
    return this.type;
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
  constructor(
    private type: VehicleType,
    private drivingLicense: string,
    private vechile_number: string,
  ) {}

  getType() {
    return this.type;
  }
}

interface PricingStrategy {
  calculateFee(time: number): number;
}

class TwoWheelerPricing implements PricingStrategy {
  calculateFee(time: number): number {
    return time * 1;
  }
}

class FourWheelerPricing implements PricingStrategy {
  calculateFee(time: number): number {
    return time * 2;
  }
}

class EightWheelPricing implements PricingStrategy {
  calculateFee(time: number): number {
    return time * 4;
  }
}

class Ticket {
  private id: string;
  private vehicle: Vehicle;
  private spot: Spot;
  private entryTime: Date;
  private exitTime: Date;

  constructor(vehicle: Vehicle, spot: Spot) {
    this.id = uuidv4();
    this.vehicle = vehicle;
    this.spot = spot;
    this.entryTime = new Date();
  }
}

class PricingRegistry {
  map = new Map<string, PricingStrategy>();

  get(type: string) {
    let strategy = this.map.get(type);
    if (!strategy) {
      throw new Error("type doesn't exist");
    }
    return strategy;
  }

  create(type: string, strategy: PricingStrategy) {
    this.map.set(type, strategy);
  }
}

class ParkingSystem {
  private spots: Spot[] = [];
  private tickets: Ticket[] = [];

  constructor(
    private pricingRegistry: PricingRegistry,
    capacity,
  ) {
    for (let i = 0; i < capacity; i++) {
      if (i % 3 == 0) {
        this.spots.push(new Spot(SpotType['2-W']));
      } else if (i % 3 == 1) {
        this.spots.push(new Spot(SpotType['4-W']));
      } else {
        this.spots.push(new Spot(SpotType['8-W']));
      }
    }
  }

  checkAvailablity(VehicleType: VehicleType) {}

  parkVehicle(Vehicle: Vehicle) {}

  generateTicket(vehicle: Vehicle) {
    const spot = this.spots.find((spot) => this.validSpot(vehicle, spot));
    if (!Spot) {
      throw new Error('No Spot Available');
    }

    return new Ticket(vehicle, spot);
  }

  private validSpot(V: Vehicle, S: Spot) {
    if (
      V.getType() == VehicleType['Two-Wheeler'] &&
      S.getType() == SpotType['2-W']
    ) {
      return S.isBooked();
    } else if (
      V.getType() == VehicleType.Compact &&
      S.getType() == SpotType['4-W']
    ) {
      return S.isBooked();
    } else if (
      V.getType() == VehicleType.Heavy &&
      S.getType() == SpotType['8-W']
    ) {
      return S.isBooked();
    }
    return false;
  }

  processExit() {}
}

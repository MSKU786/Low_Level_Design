class Spot {
  type: SpotType;
  private isReserved = false;

  constructor(private type: SpotType) {
    this.type = type;
  }

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
  vechile_number: string;

  constructor(
    private type: VehicleType,
    private drivingLicense: string,
    private vechile_number: string,
  ) {}
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

class ParkingSystem {}

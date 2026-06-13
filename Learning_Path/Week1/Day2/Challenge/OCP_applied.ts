interface ShippingStrategy {
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number;
}

enum SurCharges {
  'express' = 1.5,
  'overnight' = 2.0,
  'sameday' = 2.0,
}

enum FragileCost {
  'standard' = 15,
  'express' = 25,
  'overnight' = 50,
  'drone' = 10,
  'frieght' = 0.2,
  'same-day' = 60,
}

class StandardShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    let cost = weight * this.weightRate + distance * this.distanceRate;

    if (isFragile) cost += FragileCost.standard;
    return cost;
  }
}

class ExpressShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    let cost = weight * this.weightRate + distance * this.distanceRate;
    // express surcharge
    cost *= SurCharges.express;
    if (isFragile) return (cost += FragileCost.express);
    return cost;
  }
}

class OverNightShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    let cost = weight * this.weightRate + distance * this.distanceRate;
    // express surcharge
    cost *= SurCharges.overnight;
    if (isFragile) return (cost += FragileCost.overnight);
    return cost;
  }
}

class DroneShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    if (weight > 5) throw new Error('Too heavy for drone');
    if (distance > 10) throw new Error('Too far for drone');

    let cost = weight * this.weightRate + distance * this.distanceRate;
    if (isFragile) return (cost += FragileCost.drone);
    return cost;
  }
}

class FreightShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    let cost = weight * this.weightRate + distance * this.distanceRate;
    if (isFragile) return (cost += weight * FragileCost.frieght);
    return cost;
  }
}

class SameDayShipping implements ShippingStrategy {
  constructor(
    private weightRate: number,
    private distanceRate: number,
  ) {}
  calculateShippingCost(
    weight: number,
    distance: number,
    isFragile: boolean,
  ): number {
    let cost = weight * this.weightRate + distance * this.distanceRate;
    cost *= SurCharges.sameday;
    if (isFragile) return (cost += weight * FragileCost['same-day']);
    return cost;
  }
}

class ShippingCalculatorOCP {
  apply(
    weight: number,
    distance: number,
    isFragile: boolean,
    strategy: ShippingStrategy,
  ): number {
    return strategy.calculateShippingCost(weight, distance, isFragile);
  }
}

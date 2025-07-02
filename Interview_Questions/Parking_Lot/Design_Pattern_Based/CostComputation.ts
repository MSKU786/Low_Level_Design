import {
  HourlyPricingStrategy,
  MinutePricingStrategy,
  PricingStrategy,
} from './PricingStrategy';
import { Ticket } from './Ticket';

// Cost Computation
export class CostComputation {
  constructor(private pricingStrategy: PricingStrategy) {}

  calculateCost(ticket: Ticket): number {
    return this.pricingStrategy.calculatePrice(ticket);
  }
}

// Vehicle-specific Cost Computations
export class TwoWheelerCostComputation extends CostComputation {
  constructor() {
    super(new HourlyPricingStrategy());
  }
}

export class FourWheelerCostComputation extends CostComputation {
  constructor() {
    super(new MinutePricingStrategy());
  }
}

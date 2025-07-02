export abstract class CostComputation {
  abstract computeCost(ticket: Ticket): number;
}

export class TwoWheelerCostComputation extends CostComputation {
  computeCost(ticket: Ticket): number {
    return 10;
  }
}

export class FourWheelerCostComputation extends CostComputation {
  computeCost(ticket: Ticket): number {
    return 20;
  }
}

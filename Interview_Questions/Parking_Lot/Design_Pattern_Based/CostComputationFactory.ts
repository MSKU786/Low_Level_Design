import { Ticket } from './Ticket';

export class CostComputationFactory {
  static getCostComputation(ticket: Ticket): CostComputation {
    if (ticket.getVehicleType() == VehicleType.TWO_WHEELER) {
      return new TwoWheelerCostComputation();
    } else if (ticket.getVehicleType() == VehicleType.FOUR_WHEELER) {
      return new FourWheelerCostComputation();
    }
  }
}

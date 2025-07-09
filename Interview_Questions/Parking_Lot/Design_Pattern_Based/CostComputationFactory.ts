import { Ticket } from './Ticket';
import { CostComputation, FourWheelerCostComputation, TwoWheelerCostComputation } from './CostComputation';
import { VehicleType } from './Vehicle';

export class CostComputationFactory {
  static getCostComputation(ticket: Ticket): CostComputation | null {
    if (ticket.vehicle.getVehicleType() == VehicleType.TWO_WHEELER) {
      return new TwoWheelerCostComputation();
    } else if (ticket.vehicle.getVehicleType() == VehicleType.FOUR_WHEELER) {
      return new FourWheelerCostComputation();
    }
    return null;
  }
}

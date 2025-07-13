import { PaymentStrategy } from './PaymentStrategy';
import { Ticket } from './Ticket';

export abstract class Payment {
  protected paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  abstract processPayment(ticket: Ticket, amount: number): boolean;
}

export class ParkingPayment extends Payment {
  constructor(paymentStrategy: PaymentStrategy) {
    super(paymentStrategy);
  }

  processPayment(ticket: Ticket, amount: number): boolean {
    try {
      this.paymentStrategy.makePayment(amount);
      console.log(
        `Payment of $${amount} processed for vehicle ${ticket.vehicle.vehicleNo}`
      );
      return true;
    } catch (error) {
      console.error('Payment failed:', error);
      return false;
    }
  }
}

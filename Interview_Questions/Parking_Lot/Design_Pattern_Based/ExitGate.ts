import { Ticket } from './Ticket';
import { Vehicle } from './Vehicle';
import { ParkingSpot } from './ParkingSpot';
import { CostComputationFactory } from './CostComputationFactory';
import { ParkingPayment } from './Payment';
import {
  CashPaymentStrategy,
  CardPaymentStrategy,
  UPIPaymentStrategy,
} from './PaymentStrategy';

export class ExitGate {
  private costComputation: any;
  private payment: ParkingPayment;

  constructor() {
    // Default to cash payment, can be changed based on user preference
    this.payment = new ParkingPayment(new CashPaymentStrategy());
  }

  // Calculate parking fee based on duration and vehicle type
  calculateParkingFee(ticket: Ticket): number {
    this.costComputation = CostComputationFactory.getCostComputation(ticket);
    if (!this.costComputation) {
      throw new Error('Unable to calculate cost for this vehicle type');
    }
    return this.costComputation.calculateCost(ticket);
  }

  // Process payment for parking
  processPayment(ticket: Ticket, amount: number): boolean {
    return this.payment.processPayment(ticket, amount);
  }

  // Set payment method
  setPaymentMethod(method: 'cash' | 'card' | 'upi'): void {
    switch (method) {
      case 'cash':
        this.payment = new ParkingPayment(new CashPaymentStrategy());
        break;
      case 'card':
        this.payment = new ParkingPayment(new CardPaymentStrategy());
        break;
      case 'upi':
        this.payment = new ParkingPayment(new UPIPaymentStrategy());
        break;
      default:
        throw new Error('Invalid payment method');
    }
  }

  // Remove vehicle from parking spot
  removeVehicle(ticket: Ticket): void {
    if (ticket.parkingSpot) {
      ticket.parkingSpot.removeVehicle();
      console.log(
        `Vehicle ${ticket.vehicle.vehicleNo} removed from spot ${ticket.parkingSpot.id}`
      );
    }
  }

  // Complete exit process
  vehicleExit(
    ticket: Ticket,
    paymentMethod: 'cash' | 'card' | 'upi' = 'cash'
  ): boolean {
    try {
      // Set payment method
      this.setPaymentMethod(paymentMethod);

      // Calculate parking fee
      const fee = this.calculateParkingFee(ticket);
      console.log(`Parking fee calculated: $${fee}`);

      // Process payment
      const paymentSuccess = this.processPayment(ticket, fee);
      if (!paymentSuccess) {
        throw new Error('Payment failed');
      }

      // Remove vehicle from parking spot
      this.removeVehicle(ticket);

      console.log(`Vehicle ${ticket.vehicle.vehicleNo} successfully exited`);
      return true;
    } catch (error) {
      console.error('Exit process failed:', error);
      return false;
    }
  }
}

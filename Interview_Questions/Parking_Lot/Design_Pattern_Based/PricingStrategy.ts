import { Ticket } from './Ticket';

export abstract class PricingStrategy {
  abstract calculatePrice(ticket: Ticket);
}

export class DefaultPricingStrategy extends PricingStrategy {
  calculatePrice(ticket: Ticket) {
    return ticket.parkingSpot.price;
  }
}

export class HourlyPricingStrategy extends PricingStrategy {
  calculatePrice(ticket: Ticket) {
    const currentTime = new Date();
    const durationHours =
      (currentTime.getTime() - ticket.entryTime.getTime()) / (1000 * 60 * 60);
    return ticket.parkingSpot.price * durationHours;
  }
}

export class MinutePricingStrategy extends PricingStrategy {
  calculatePrice(ticket: Ticket) {
    const currentTime = new Date();
    const durationMinutes =
      (currentTime.getTime() - ticket.entryTime.getTime()) / (1000 * 60);
    return ticket.parkingSpot.price * durationMinutes;
  }
}

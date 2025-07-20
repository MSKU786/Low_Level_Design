import { User } from './User';
import { Vechicles } from './Vehicles';

export class Reservation {
  id: number;
  user: User;
  vehicle: Vechicles;
  bookingDate: Date;
  bookedFrom: Date;
  bookedTill: Date;
  status: ReservationStatus;
  pickupLocation: Location;
  dropLocation: Location;
  reserationType: any;

  createReservation(vehicle: Vechicles, user: User): number {
    let id = Math.trunc(Math.random() * 1000000);
    this.user = user;
    this.vehicle = vehicle;
    this.status = ReservationStatus.SCHEDULED;
    return id;
  }
}

export enum ReservationStatus {
  SCHEDULED,
  INPROGRESS,
  COMPLETED,
  CANCELED,
  CLOSED,
}

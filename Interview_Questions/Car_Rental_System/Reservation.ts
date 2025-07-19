import { Vechicles } from './Vechicles';

export class Reservation {
  id: number;
  user: User;
  vehicle: Vechicles;
  bookingDate: Date;
  bookedFrom: Date;
  bookedTill: Date;
}

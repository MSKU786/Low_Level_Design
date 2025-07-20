import { Bill } from './Bill';

export class Payment {
  paybill(bill: Bill) {
    console.log('Payment logic and bill paid');
    bill.isBillPaid = true;
  }
}

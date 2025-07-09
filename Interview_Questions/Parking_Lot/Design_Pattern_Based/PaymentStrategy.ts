export abstract class PaymentStrategy {
  abstract makePayment(amount: number);
}

export class DefaultPaymentStrategy extends PaymentStrategy {
  makePayment(amount: number) {
    console.log('Add entry in default system');
  }
}

export class CashPaymentStrategy extends PaymentStrategy {
  makePayment(amount: number) {
    console.log('Add entry in cash system');
  }
}

export class CardPaymentStrategy extends PaymentStrategy {
  makePayment(amount: number) {
    console.log('Add entry in card system');
  }
}

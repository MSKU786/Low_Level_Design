import {
  PaymentStrategy,
  CashPaymentStrategy,
  CardPaymentStrategy,
  UPIPaymentStrategy,
} from './PaymentStrategy';

// Payment Abstract Class
abstract class Payment {
  protected paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  makePayment(amount: number): void {
    this.paymentStrategy.makePayment(amount);
  }
}

// Concrete Payment Classes
export class CashPayment extends Payment {
  constructor() {
    super(new CashPaymentStrategy());
  }
}

export class CardPayment extends Payment {
  constructor() {
    super(new CardPaymentStrategy());
  }
}

export class UPIPayment extends Payment {
  constructor() {
    super(new UPIPaymentStrategy());
  }
}

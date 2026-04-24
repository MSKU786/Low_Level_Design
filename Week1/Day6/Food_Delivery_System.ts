enum OrderStatus {
  PLACED,
  CONFIRMED,
  PREPARING,
  OUT_FOR_DELIVERY,
  DELIVERED,
  CANCELLED,
  FAILED
}

class Order {
  private status: OrderStatus;

  constructor() {
    this.status = OrderStatus.PLACED;
  }

  getStatus() {
    return this.status;
  }

  private transitionTo(next: OrderStatus) {
    // validate using allowed transitions
  }

  markConfirmed() {
    this.transitionTo(OrderStatus.CONFIRMED);
  }

  markPreparing() {
    this.transitionTo(OrderStatus.PREPARING);
  }

  // add others similarly
}

class OrderValidator {
  validateOrder(restrauntId, items) {
    
  }
}


class PriceCalculator {
    constructor(private deliveryType: DeliveryStrategy, private discountType: DiscountStrategy) {

    }

    calulateTotalCost(order: Order) {
      let amount = order.amount;
      amount += this.deliveryType.calculateShippingCost()
      amount += this.discountType.calculateDiscount()
      return amount;
    }
}


class PaymentProcessor{

}

class OrderRepository {

}


interface DeliveryStrategy {
  calculateShippingCost(): number;
}


class StardardDeliveryStrategy implements DeliveryStrategy {
  calculateShippingCost(): number {
    return 0;
  }
}

class ExpressDeliveryStrategy implements DeliveryStrategy {
  calculateShippingCost(): number {
    return 0;
  }
}

class ScheduledDeliveryStrategy implements DeliveryStrategy {
  calculateShippingCost(): number {
    return 0
  }
}


interface DiscountStrategy {
  calculateDiscount(): number;
}

class PercentageDiscount implements DiscountStrategy {
  calculateDiscount(): number {
    return 0;
  }
}

class FlatAmountDiscount implements DiscountStrategy {
  calculateDiscount(): number {
    return 0;
  }
}

class FreeDelivery implements DiscountStrategy {
  calculateDiscount(): number {
    return 0;
  }
}



interface PaymentStrategy {
  processPayment(amount): Promise<PaymentResult>;
}


type PaymentResult = {
  status: "SUCCESS" | "FAILED" | "RETRY";
};

class UPIPaymentStrategy implements PaymentStrategy {
  processPayment(amount): Promise<PaymentResult> {
    return;
  }
}

class CCPaymentStrategy implements PaymentStrategy {
  processPayment(amount): Promise<PaymentResult> {
    return;
  }
}

class CODPaymentStrategy implements PaymentStrategy {
  processPayment(amount): Promise<PaymentResult> {
    return;
  }
}



interface Notifier {
  sendNotification( message: string): void;
}


class CustomerNotifier implements Notifier {

  constructor(private userId: string, private toNumber: string ) {

  }

  sendNotification(message: string): void {
    
  }
}


class RestaruantNotifier implements Notifier {
  constructor(private email: string, private dashboardId: string) {

  }

  sendNotification(message: string): void {
    
  }
}


class OrderService {
  constructor(
    private validator: OrderValidator,
    private pricing: PriceCalculator,
    private payment: PaymentStrategy,
    private repo: OrderRepository
  ) {}

  async createOrder(order: Order) {
    order.markPreparing();
    this.validator.validate(order.restaurantId, order.items);

    const price = this.pricing.calulateTotalCost(order);

    const paymentResult = await this.payment.processPayment(price.total);

    if (paymentResult.status !== "SUCCESS") {
      throw new Error("Payment failed");
    }

    order.markConfirmed();
    await this.repo.save(order);
  }
}
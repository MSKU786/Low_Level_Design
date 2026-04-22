

class OrderValiator {
  validateOrder(restrauntId, items) {
    
  }
}


class PriceCalculator{

}


class PaymentProcessor{

}

class OrderRepository {

}


class OrderService {
  constructor(private validator: OrderValiator, private priceManager: PriceCalculator, private orderDB: OrderRepository, private paymentProcessor: PaymentProcessor) {}

  async createOrder(userId: string, restrauntId: string, items: CartItem[]) {
    this.validator.validateOrder(restrauntId, items);
    const totalAmount = this.priceManager.calculate(items);

  }
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


interface DiscountStrategcy {
  calculateDiscount(): number;
}

class PercentageDiscount implements DiscountStrategcy {
  calculateDiscount(): number {
    return 0;
  }
}

class FlatAmountDiscount implements DiscountStrategcy {
  calculateDiscount(): number {
    return 0;
  }
}

class FreeDelivery implements DiscountStrategcy {
  calculateDiscount(): number {
    return 0;
  }
}



interface PaymentStrategy {
  processPayment(): Promise<void>;
}


class UPIPaymentStrategy implements PaymentStrategy {
  processPayment(): Promise<string> {
    return;
  }
}

class CCPaymentStrategy implements PaymentStrategy {
  processPayment(): Promise<void> {
    return;
  }
}

class CODPaymentStrategy implements PaymentStrategy {
  processPayment(): Promise<void> {
    return;
  }
}
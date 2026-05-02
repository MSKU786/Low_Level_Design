// =============================================
// TYPES & ENUMS
// =============================================

enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: number;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface PricingBreakdown {
  total: number;
}

// =============================================
// STATE MACHINE
// =============================================

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PLACED]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]: [OrderStatus.OUT_FOR_DELIVERY],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.FAILED]: [],
};

// =============================================
// ENTITY
// =============================================

class Order {
  private status: OrderStatus = OrderStatus.PLACED;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly restaurantId: string,
    public readonly items: OrderItem[],
    public readonly pricing: PricingBreakdown,
    public paymentId?: string
  ) {}

  getStatus() {
    return this.status;
  }

  private transitionTo(next: OrderStatus) {
    const allowed = VALID_TRANSITIONS[this.status] || [];
    if (!allowed.includes(next)) {
      throw new Error(`Invalid transition ${this.status} -> ${next}`);
    }
    this.status = next;
  }

  markConfirmed() {
    this.transitionTo(OrderStatus.CONFIRMED);
  }

  markPreparing() {
    this.transitionTo(OrderStatus.PREPARING);
  }

  markFailed() {
    this.status = OrderStatus.FAILED;
  }
}

// =============================================
// DOMAIN
// =============================================

class Restaurant {
  constructor(public readonly id: string, public readonly name: string) {}

  isOpen(): boolean {
    return true;
  }
}

// =============================================
// STRATEGIES
// =============================================

interface DeliveryStrategy {
  calculateShippingCost(distance: number): number;
}

class StandardDelivery implements DeliveryStrategy {
  calculateShippingCost(): number {
    return 40;
  }
}

interface DiscountStrategy {
  calculateDiscount(items: OrderItem[], subtotal: number): number;
}

class NoDiscount implements DiscountStrategy {
  calculateDiscount(): number {
    return 0;
  }
}

// =============================================
// PAYMENT
// =============================================

type PaymentResult = {
  status: "SUCCESS" | "FAILED";
  transactionId?: string;
  error?: string;
};

interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

class UPIPayment implements PaymentStrategy {
  constructor(private vpa: string) {}

  async pay(): Promise<PaymentResult> {
    if (!this.vpa.includes("@")) {
      return { status: "FAILED", error: "Invalid UPI" };
    }

    return {
      status: "SUCCESS",
      transactionId: `txn_${Date.now()}`,
    };
  }
}

interface PaymentProcessor {
  processPayment(
    amount: number,
    strategy: PaymentStrategy
  ): Promise<PaymentResult>;
}

class DefaultPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number, strategy: PaymentStrategy) {
    return strategy.pay(amount);
  }
}

// =============================================
// VALIDATION
// =============================================

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface OrderValidator {
  validate(items: OrderItem[], restaurant: Restaurant): ValidationResult;
}

class DefaultValidator implements OrderValidator {
  validate(items: OrderItem[], restaurant: Restaurant): ValidationResult {
    const errors: string[] = [];

    if (!restaurant.isOpen()) errors.push("Restaurant closed");
    if (!items.length) errors.push("Empty order");

    if (items.some(i => i.menuItem.available < i.quantity)) {
      errors.push("Out of stock");
    }

    return { isValid: errors.length === 0, errors };
  }
}

// =============================================
// PRICING
// =============================================

interface PricingService {
  calculate(
    items: OrderItem[],
    delivery: DeliveryStrategy,
    discount: DiscountStrategy,
    distance: number
  ): number;
}

class DefaultPricing implements PricingService {
  calculate(
    items: OrderItem[],
    delivery: DeliveryStrategy,
    discount: DiscountStrategy,
    distance: number
  ): number {
    const subtotal = items.reduce(
      (acc, i) => acc + i.menuItem.price * i.quantity,
      0
    );

    const tax = subtotal * 0.05;
    const deliveryCost = delivery.calculateShippingCost(distance);
    const discountValue = discount.calculateDiscount(items, subtotal);

    return subtotal + tax + deliveryCost - discountValue;
  }
}

// =============================================
// REPOSITORY
// =============================================

interface OrderRepository {
  save(order: Order): Promise<void>;
}

class InMemoryOrderRepo implements OrderRepository {
  private db = new Map<string, Order>();

  async save(order: Order) {
    this.db.set(order.id, order);
  }
}

// =============================================
// NOTIFIERS
// =============================================

interface CustomerNotifier {
  notify(customer: Customer, message: string): Promise<void>;
}

class ConsoleNotifier implements CustomerNotifier {
  async notify(customer: Customer, message: string) {
    console.log(`[Notify ${customer.name}] ${message}`);
  }
}

// =============================================
// ORCHESTRATOR (MAIN)
// =============================================

class OrderService {
  constructor(
    private validator: OrderValidator,
    private pricing: PricingService,
    private paymentProcessor: PaymentProcessor,
    private repo: OrderRepository,
    private notifier: CustomerNotifier
  ) {}

  async createOrder(params: {
    customer: Customer;
    restaurant: Restaurant;
    items: OrderItem[];
    delivery: DeliveryStrategy;
    discount: DiscountStrategy;
    payment: PaymentStrategy;
    distance: number;
  }): Promise<Order> {
    const { customer, restaurant, items, delivery, discount, payment, distance } = params;

    // 1. Validate
    const result = this.validator.validate(items, restaurant);
    if (!result.isValid) {
      throw new Error(result.errors.join(", "));
    }

    // 2. Price
    const total = this.pricing.calculate(items, delivery, discount, distance);

    // 3. Create Order
    const order = new Order(
      `order_${Date.now()}`,
      customer.id,
      restaurant.id,
      items,
      { total }
    );

    try {
      // 4. Payment
      const paymentResult = await this.paymentProcessor.processPayment(total, payment);

      if (paymentResult.status !== "SUCCESS") {
        order.markFailed();
        throw new Error("Payment failed");
      }

      order.paymentId = paymentResult.transactionId;

      // 5. State transitions
      order.markConfirmed();
      order.markPreparing();

      // 6. Save
      await this.repo.save(order);

      // 7. Notify
      await this.notifier.notify(customer, "Order placed successfully");

      return order;

    } catch (err) {
      order.markFailed();
      throw err;
    }
  }
}

// =============================================
// USAGE EXAMPLE
// =============================================

(async () => {
  const service = new OrderService(
    new DefaultValidator(),
    new DefaultPricing(),
    new DefaultPaymentProcessor(),
    new InMemoryOrderRepo(),
    new ConsoleNotifier()
  );

  const order = await service.createOrder({
    customer: { id: "c1", name: "Manish", email: "", phone: "" },
    restaurant: new Restaurant("r1", "Dominos"),
    items: [
      {
        menuItem: { id: "m1", name: "Pizza", price: 200, available: 10 },
        quantity: 2,
      },
    ],
    delivery: new StandardDelivery(),
    discount: new NoDiscount(),
    payment: new UPIPayment("manish@upi"),
    distance: 5,
  });

  console.log("Order Created:", order.getStatus());
})();
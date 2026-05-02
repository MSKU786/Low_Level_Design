
// =============================================
// TYPES & ENUMS
// =============================================


enum OrderStatus {
  PLACED,
  CONFIRMED,
  PREPARING,
  OUT_FOR_DELIVERY,
  DELIVERED,
  CANCELLED,
  FAILED
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


// =============================================
// Order Entity with state machine
// =============================================

const VALID_TRANSACTIONS: Record<OrderStatus, OrderStatus[]>: {
  [OrderStatus.PLACED]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED, OrderStatus.failed].
  [OrderStatus.PREPARING]: [OrderStatus.OUT_FOR_DELIVERY]
}

class Order {
  public readonly id: string;
  public readonly customerId: string;
  public readonly restaurantId: string;
  public readonly items: OrderItem[];
  public readonly pricing: PricingBreakdown;
  public readonly paymentId? : string;
  private status: OrderStatus;
  public readonly createdAt: Date;

  constructor(params: {
    id: string;
    customerId: string;
    restaurantId: string;
    items: OrderItem[];
    pricing: PricingBreakdown;
    paymentId?: string;
  }) {
    this.id = params.id;
    this.customerId = params.customerId;
    this.restaurantId= params.restaurantId;
    this.items=params.items;
    this.pricing= params.pricing;
    this.paymentId = params.paymentId;
    this.status = OrderStatus.PLACED;
    this.createdAt = new Date();  
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

  cancel(): void {
    if (this.status === OrderStatus.PREPARING ||
      this.status === OrderStatus.OUT_FOR_DELIVERY ||
      this.status === OrderStatus.DELIVERED
    ) {
      throw new Error (
        'Cannot cancel order '
      )
    }

    this.transitionTo(OrderStatus.CANCELLED);
  }

  // add others similarly
}


class Restaruant {
  constructor(public readonly id: string, public readonly name: string) {}

  isOpen(): boolean {
    return true;
  }

  getMenu(): MenuItem[] {
    return [];
  }
}

// ===================================================
// STRATEGY INTERFACES
// ===================================================

interface DeliveryStrategy {
  calculateShippingCost(distance: number): number;
}


class StardardDeliveryStrategy implements DeliveryStrategy {
  constructor(private flatFee: number = 40) {}

  calculateShippingCost(_distance: number): number {
    return 0;
  }
}

class ExpressDeliveryStrategy implements DeliveryStrategy {

  constructor(private baseFee: number = 60, private perKmFee: number = 10) {}
  calculateShippingCost(_distance: number): number {
    return 0;
  }
}

class ScheduledDeliveryStrategy implements DeliveryStrategy {
 
  constructor(private slotFee: number = 20) {}
  calculateShippingCost(): number {
    return this.slotFee;
  }
}


interface DiscountStrategy {
  calculateDiscount(items: OrderItem[], subtotal: number): number;
}

class PercentageDiscount implements DiscountStrategy {

  constructor(private percent: number) {}

  calculateDiscount(items: OrderItem[], subtotal: number): number {
    return 0;
  }
}

class FlatAmountDiscount implements DiscountStrategy {
  constructor(private amount: number) {}
  calculateDiscount(items: OrderItem[], subtotal: number): number {
    return 0;
  }
}

class FreeDeliveryDiscount implements DiscountStrategy {

  constructor(public readonly freeDelivery: boolean = true) {}

  calculateDiscount(items: OrderItem[], subtotal: number): number {
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
  constructor(private vpa: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    if (!this.vpa.includes("@")) {
      return {
        success: false, 
        error: "Invalid UPI format"
      }
    }

    const txnId = `upi_${Date.now()}`
    return {success: true, transactionId: txnId}
  }
}

class CCPaymentStrategy implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string, private expiry: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    if (this.cvv.length != 3) {
      return {
        success: false, 
        error: "Invalid CVV"
      }
    }

    const txnId = `upi_${Date.now()}`
    return {success: true, transactionId: txnId}
  }
}

class CODPaymentStrategy implements PaymentStrategy {
  constructor(private vpa: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    if (!this.vpa.includes("@")) {
      return {
        success: false, 
        error: "Invalid UPI format"
      }
    }

    const txnId = `upi_${Date.now()}`
    return {success: true, transactionId: txnId}
  }
}

// DOMAIN Interfaces

interface OrderValidator {
  validate(
    items: OrderItem[],
    restrauntId: Restaruant
  ): ValidationResult;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}


// Pricing

interface PricingStrategy {
  calulateTotalCost(items: OrderItem[], deliveryType: DeliveryStrategy, discountType: DiscountStrategy | null): number;
}

interface PaymentProcessor {
  processPayment(amount: number, strategy: PaymentStrategy): Promise<PaymentResult>;
}


// Persistence

interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
}



// -- Notifications (ISP: seprate per recipient type)
// Each interface represnet a Role not a channel
// the implemntaiton decide which channel to use

interface CustomerNotifier {
  orderPlaced(customer: Customer, order: Order): Proimise<void>;
  orderStatusChanged(customer: Customer, order: Order): Proimise<void>;
}

interface RestaruantNotifier {
  newOrder(restaruant: Restaruant, order: Order): Proimise<void>;
}


interface DriverNotifer {
  deliveryAssigned(driver: Driver, order: Order): Proimise<void>;
}


// Implemenations
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
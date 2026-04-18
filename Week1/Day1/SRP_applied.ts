// Each class has exactly one reason to change

// Reason to change: Validation rate changes
class OrderValidator {
  validate(items: CartItem[]) {
    if (items.length == 0) throw new Error('Cart is empty');
    if (items.some((i) => i.quantity < 1)) throw new Error('Invalid quantity');
  }
}

// Reason to change : Tax rule or rate changes or add new tax item
class TaxCalculator {
  private rates: Record<string, number> = {
    electronics: 0.18,
    food: 0.05,
    default: 0.12,
  };

  calculateTax(items: CartItems[]): number {
    return items.reduce((sum, item) => {
      const rate = this.rates[item.category] ?? this.rates['default'];
      return sum + item.price * rate;
    });
  }
}

// Reason to change: DB schema or ORM Changes
class OrderRepository {
  async save(userId: string, total: number, tax: number): Promise<Order> {
    return await db.query(
      `INSERT INTO order (user_id, total, tax)
      VALUES ($1, $2, $3) RETURNING *`,
      [userId, total, tax],
    );
  }
}

// Reason to change: Notification channel or template
class OrderNotifier {
  async sendNotification(email: string, order: Order): Promise<void> {
    await sendgrid.send({
      to: email,
      subject: `Order #${order.id} confiremd`,
      html: `<h1> Thanks for the order! </h1>`,
    });
  }
}

// Orchestrator -> coordinates and don't implement the logic
class OrderService {
  constructor(
    private validator: OrderValidator,
    private tax: TaxCalculator,
    private dbRepo: OrderRepository,
    private notifier: OrderNotifier,
  ) {}

  async createOrder(userId: string, items: CartItem[]) {
    this.validator.validate(items);
    const tax = this.tax.calculateTax(items);
    const total = /*sum item*/ +tax;
    const order = await this.dbRepo.save(userId, total, tax);

    await this.notifier.sendNotification(user.email, order);

    return order;
  }
}

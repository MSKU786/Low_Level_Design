// Each class has exactly one reason to change

class OrderValidator {
  validate(items: CartItem[]) {
    if (items.length == 0) throw new Error('Cart is empty');
    if (items.some((i) => i.quantity < 1)) throw new Error('Invalid quantity');
  }
}

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

class OrderRepository {
  async save(userId: string, total: number, tax: number): Promise<Order> {
    return await db.query(
      `INSERT INTO order (user_id, total, tax)
      VALUES ($1, $2, $3) RETURNING *`,
      [userId, total, tax],
    );
  }
}

class OrderNotifier {
  async sendNotification(email: string, order: Order): Promise<void> {
    await sendgrid.send({
      to: email,
      subject: `Order #${order.id} confiremd`,
      html: `<h1> Thanks for the order! </h1>`,
    });
  }
}

class OrderService {
  constructor(
    private validator: OrderValidator,
    private tax: TaxCalculator,
    private dbRepo: OrderRepository,
    private notifier: OrderNotifier,
  ) {}

  async;
}

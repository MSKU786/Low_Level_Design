// High level moduels defines the interface it needs
// Zero import from infrastructure pacakges


interface PaymentGateway {
  charge(amount: number, currency: string): Promise<PaymentResult>;
  refund(amount: number, currency: string): Promise<void>;
}

interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order>;
}

interface NotificationSender {
  sendOrderConfirmation(userId: string, message: string): Promise<void>;
}

interface CacheStore {
  invalidate(key: string): Promise<void>;
}


// OrderService only depend on abstraction

class OrderService {
  constructor (
    private payment: PaymentGateway,
    private repo: OrderRepository,
    private notifier: NotificationSender,
    private cache: CacheStore,
  ) {}

  async placeOrder(userId: string, items: CartItem[]) {

    const total = items.reduce((s,i) => s+=(i.price*i.quantity), 0)

    const result = await this.payment.charge(total, "usd");
    const order = await this.repo.save({
      userId, items, total, paymentId: result.id
    })
    await this.notifier.sendOrderConfirmation(
      user.email, order
    )
    await this.cache.set(`order:${order.id}`, order);

    return order;
  }
}
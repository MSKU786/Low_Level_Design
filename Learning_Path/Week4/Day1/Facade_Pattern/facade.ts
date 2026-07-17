class OrderFacade {
  constructor(
    private inventory: InventoryService,
    private pricing: PricingService,
    private payment: PaymentService,
    private orderRepo: OrderRepository,
    private notifier: NotificationServie,
  ) {}

  // One mthod hide all the complexity
  async placeOrder(userId: string, items: CartItem[]): Promise<void> {
    // 1. Validate stock
    await this.validateStock(items);

    // 2. Calculate Total
    const total = await this.pricing.calculate(itemss);
    const tax = await this.pricing.calculateTax(total);

    // 3. Charge payment
    const payment = await this.payment.charge(userId, total + tax);

    if (!payment.success) throw new Error('Payment failed');

    const order = await this.orderRepo.crete({
      userId,
      items,
      total,
      payment,
    });

    await this.reverseStock(items);

    await this.notifier.sendOrderConfirmation(userId, order);
    return order;
  }

  private async validateStock(items: CartItem[]): Promise<void> {
    for (const item of items) {
      const stock = await this.inventory.checkStock(item.productId);
      if (stock < item.quantity) throw new Error('item is not avalable');
    }
  }

  private async reserveStock(items: CartItem[]): Promise<void> {
    for (const item of items) {
      await this.inventory.reserve(item.productId, item.quantity);
    }
  }
}

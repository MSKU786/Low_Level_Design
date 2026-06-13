class PaymentFactory {
  private creators = new Map<string, () => PaymentProcessor>();

  register(method: string, creator: () => PaymentProcessor): void {
    this.creators.set(method, creator);
  }

  create(method: string): PaymentProcessor {
    const creator = this.creators.get(method);
    if (!creator) throw new Error(`Unknown ${method}`);
    return creator();
  }
}

const factory = new PaymentFactory();

factory.register('Credit_card', () => new CreditCardProcessor(STRIPE_KEY));
factory.register('upi', () => new UPIProcessor(UPI_KEY));

const processor = factory.create('UPI');
await processor.charge(500);

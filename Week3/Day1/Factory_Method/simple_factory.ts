// Simple Factory - centraizes creation in one place

interface PaymentProcessor {
  charge(amount: number): Promise<PaymentResult>;
  refund(amount: number): Promise<PaymentResult>;
}

class PaymentFactory {
  static create(method: string): PaymentProcessor {
    switch (method) {
      case 'credit_card':
        return new CreditCardProcessor(process.env.STIPE_KEY);
      case 'upi':
        return new UPIProcessor(process.env.WALLET_KEY);
      case 'wallet':
        return new WalletProcessor(process.env.WALLET_KEY);
    }
  }
}

// Now services are clean:
function processPayment(method: string, amount: number) {
  const processor = PaymentFactory.create(method);
  return processor.charge(amount);
}

function processRefund(method: string, amount: number) {
  const processor = PaymentFactory.create(method);
  return processor.refund(amount);
}

interface PaymentProcessor {
  charge(
    amount: number,
    currency: string,
  ): Promise<{
    success: boolean;
    transactionId: string;
  }>;
  refund(transactionId: string): Promise<{ success: boolean }>;
}

// Stripe api looks like this ()

class StripeAdapter implements PaymentProcessor {
  private stripe: StripeSDK;

  constructor(apiKey: string) {
    this.stripe = new StripeSDK(apiKey);
  }

  async charge(
    amount: number,
    currency: string,
  ): Promise<{ success: boolean; transactionId: string }> {
    const result = this.stripe.charges.create({
      amount: Math.round(amount * 100),
      currency,
      source: 'token_default',
    });

    return Promise.resolve({
      success: result.status === 'success',
      transactionId: result.id,
    });
  }

  async refund(transactionId: string): Promise<{ success: boolean }> {
    const result = await this.stripe.refunds.create({
      charge: transactionId,
    });
    return Promise.resolve({
      success: result.status === 'success',
    });
  }
}

class RazorAdapter implements PaymentProcessor {
  private razorpay: RazorpaySDK;

  constructor(apiKey: string) {
    this.razorpay = new RazorpaySDK(apiKey);
  }

  async charge(
    amount: number,
    currency: string,
  ): Promise<{ success: boolean; transactionId: string }> {
    const order = await this.razorpay.createOrder({
      amount: amount * 100,
      currency,
    });

    const payment = await this.razorpay.capturePayment(order.order_id);

    return {
      success: payment.captured,
      transactionId: payment.payment_id,
    };
  }

  async refund(transactionId: string): Promise<{ success: boolean }> {
    return { success: true };
  }
}

class StripeSDK {
  charges = {
    async create(params: { amount: number; currency: string; source: string }) {
      return {
        id: 'ch_xxxx',
        status: 'successded',
        amount: params.amount,
      };
    },
  };

  refunds = {
    async create(params: { charge: string }) {
      return { id: 're_xxx', status: 'succedded' };
    },
  };
}

class RazorpaySDK {
  async createOrder(params: { amount: number; currency: string }) {
    return { order_id: 'order_xx', status: 'created' };
  }

  async capturePayment(order: string) {
    return { payment_id: 'pya_xxx', captured: true };
  }

  async refund(transactionId: string) {
    return { success: true };
  }
}
// code do not know stripe exites

class CheckoutService {
  constructor(private payment: PaymentProcessor) {}
}

const checkout = new CheckoutService(new StripeAdapter(STRIPE_KEY));
const razorCheckout = new CheckoutService(new RazorAdapter(RAZOR_API_KEY));

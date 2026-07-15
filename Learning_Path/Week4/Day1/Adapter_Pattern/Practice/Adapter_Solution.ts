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

// code do not know stripe exites

class CheckoutService {
  constructor(private payment: PaymentProcessor) {}
}

const checkout = new CheckoutService(new StripeAdapter(STRIPE_KEY));

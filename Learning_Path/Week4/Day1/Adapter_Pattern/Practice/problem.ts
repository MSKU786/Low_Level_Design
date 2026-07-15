interface PaymentProcessor {
  charge(
    amount: number,
    currency: number,
  ): Promise<{
    success: boolean;
    transactionId: string;
  }>;
  refund(transactionId: string): Promise<{ success: boolean }>;
}

// Stripe api looks like this ()

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

// Without a factory

// In orderservice.ts

function processPayment(method: string, amount: number) {
  let processor;

  if (method === 'credit_card') {
    processor = new CreditCardProcessor('sk_live_123');
  } else if (method === 'upi') {
    processor = new UPIProccessor('upi_key');
  } else if (method === 'waller') {
    processor = new WallerProcessor('wallet_key');
  }

  processor.charge(amount);
}

function processRefund(method: string, amount: number) {
  let processor;

  if (method === 'credit_card') {
    processor = new CreditCardProcessor('sk_live_123');
  }
  // Copy paste of the same create loginc
}

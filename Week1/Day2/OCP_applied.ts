interface DiscountStrategy {
  evaluateDiscount(order: Order): number;
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}

  evaluateDiscount(order: Order): number {
    return order.total * (this.percentage / 100);
  }
}

class FlatDiscount implements DiscountStrategy {
  constructor(private amount: number) {}
  evaluateDiscount(order: Order): number {
    return this.amount;
  }
}

class BuyOneGetOneDiscount implements DiscountStrategy {
  evaluateDiscount(order: Order): number {
    const cheapest = Math.min(...order.items.map((i) => i.price));
    return cheapest;
  }
}

// Adding a new discount
class LoyalityDiscount implements DiscountStrategy {
  private rates: Record<string, number> = {
    gold: 0.15,
    silver: 0.1,
    bronze: 0.05,
  };
  evaluateDiscount(order: Order): number {
    const tier = order.user.loyalityTier;
    return order.total * (this.rates[tier] ?? this.rates.bronze);
  }
}

// The Service is close -> no if/else, no editing

class DiscountService {
  apply(order: Order, strategy: DiscountStrategy): number {
    return strategy.evaluateDiscount(order);
  }
}

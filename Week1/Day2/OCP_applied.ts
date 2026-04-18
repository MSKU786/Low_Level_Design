interface DiscountStrategy {
  evaluateDiscount(order: Order, discountType: string): number;
}

class PercentageDiscount implements DiscountStrategy {
  evaluateDiscount(order: Order, discountType: string): number {
    return order.total * (order.discountValue / 100);
  }
}

class FlatDiscount implements DiscountStrategy {
  evaluateDiscount(order: Order, discountType: string): number {
    return order.discountValue;
  }
}

class BuyOneGetOneDiscount implements DiscountStrategy {
  evaluateDiscount(order: Order, discountType: string): number {
    const cheapest = Math.min(...order.items.map((i) => i.price));
    return cheapest;
  }
}


class LoyalityDiscount
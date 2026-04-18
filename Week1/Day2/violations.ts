class DiscountService {
  evaluateDiscount(order: Order, discountType: string): number {
    if (discountType === 'percentage') {
      return order.total * (order.discountValue / 100);
    } else if (discountType === 'flat') {
      return order.discountValue;
    } else if (discountType === 'buy-one-get-one') {
      const cheapest = Math.min(...order.items.map((i) => i.price));
      return cheapest;
    } else if (discountType === 'loyality') {
      const tier = order.user.loyalityTier;
      if (tier === 'gold') return order.total * 0.15;
      if (tier === 'silver') return order.total * 0.1;
      return order.total * 0.05;
    }
    return 0;
  }
}

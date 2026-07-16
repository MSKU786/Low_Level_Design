async function placeOrder(userId: string, items: CartItem[]) {
  // 1. validate inventory
  const inventoryService = new InventoryService();
  for (const item of items) {
    const stock = await inventoryService.checkStock(item.productId);
    if (stock < item.quantity) throw new Error('Out of stock');
  }

  // 2. Calulate Pricing
  const pricingService = new PricingService();
  const total = await pricingService.calculate(items);
  const tax = await pricingService.calculateTax(total);

  // 3. Process payment
  const paymentService = new PaymentService();
  const payment = await paymentService.charge(userId, total + tax);

  // 4. Create order record
  const orderRepo = new OrderRepository();
  const order = await orderRepo.crete({ userId, items, total, payment });

  //5. Reserve inventory
  for (const item of items) {
    await inventoryService.reserve(item.productId, item.quantity);
  }

  // Send notification
  const notifier = new NotificationService();
  await notifier.sendOrderConfirmation(userId, order);
  return order;
}

// consumer knowes about 6 idffernt service
// consumer knows the excact order of operations
// 3. if thee workflow changes every consumer mus tupdate
// 4. Error handling across 6 services is the consumers's problem
// 5. can't reuse the si workflow

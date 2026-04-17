// This class has at least 4 reason to change:

class OrderService {
  async createOrder(userId: string, items: CartItem[]) {
    // * Responsiblity 1: Validation
    if (items.length == 0) throw new Error('Cart is empty');
    if (items.some((i) => i.quantity < 1)) throw new Error('Invalid quantity');

    // * Responsiblity 2: Tax Calculations
    let tax = 0;
    for (const item of items) {
      if (item.category === 'electronics') {
        tax += item.price * 0.18;
      } else if (item.category === 'food') {
        tax += item.price * 0.05;
      } else {
        tax += item.price * 0.12;
      }
    }

    // Responsiblity 3: Persistence
    const order = await db.query(
      `INSERT INTO order (user_id, total, tax)
      VALUES ($1, $2, $3) RETURNING *`,
      [userId, total, tax],
    );

    // Responsiblity 4: Notification
    await sendgrid.send({
      to: user.email,
      subject: `Order #${order.id} confiremd`,
      html: `<h1> Thanks for the order! </h1>`,
    });

    return order;
  }
}

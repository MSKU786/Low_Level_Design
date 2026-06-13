// High level modules directly imports low level modules
// Every import is a concerete dependency arrow pointsing OUTWARD

import {StripeClient} from 'stripe';
import {PostgressPool} from 'pg';
import { SendGridClient
} from 'sendgrid';
import {RedisClient} from 'redis';

class OrderService {
  // Creates it's own dependecy -> can't swap anything

  private db = new PostgressPool();
  private stripe = new StripeClient();
  private sendgrid = new SendGridClient();
  private cache = new RedisClient();

  async placeOrder(userId: string, items: CartItem[]) {
    const total = items.reduce((sum, item) => sum += item.price * item.quantity, 0);

    const charges = await this.stripe.charges.create({
      amount: total,
      currency: 'usd',
    })

    const order = await this.db.query(
      `INSERT INTO orders (user_id, total, status) VALUES ($1, $2, 'pending') RETURNING *`,
      [userId, total],
    );

    await this.sendgrid.send({
      to: user.email,
      subject: `Order #${order.id} confiremd`,
      html: `<h1> Thanks for the order! </h1>`,
    });

    this.cache.set(`order:${order.id}`, order);

    return order;
  }
}

/*

Problems:
Can't test without real stripe, Postgres, SendGrid, or Redis.
Hard to swap out dependencies.
Business logic is burried between infrastrucuture calls
*/
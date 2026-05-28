// SOLID / OOP Violation Exercise

// Problem Statement:
// This class has at least 6 violations across SOLID principles and OOP concepts.
//
// For each:
// 1. Name the violation
// 2. Quote the specific line(s)
// 3. Explain the fix in one sentence

import { MongoClient } from 'mongodb';
import { SendGrid } from '@sendgrid/mail';
import { Stripe } from 'stripe';

class SubscriptionService {
  db = new MongoClient('mongodb://localhost');
  email = new SendGrid('SG_KEY');
  stripe = new Stripe('sk_test_123');

  subscriptions: any[] = [];
  revenue: number = 0;

  async subscribe(userId: string, plan: string) {
    // Validate
    if (plan !== 'basic' && plan !== 'pro' && plan !== 'enterprise') {
      throw new Error('Invalid plan');
    }

    // Calculate price
    let price = 0;

    if (plan === 'basic') {
      price = 10;
    } else if (plan === 'pro') {
      price = 25;
    } else if (plan === 'enterprise') {
      price = 100;
    }

    // Charge
    await this.stripe.charges.create({
      amount: price * 100,
      currency: 'usd',
    });

    // Save
    await this.db.collection('subs').insertOne({
      userId,
      plan,
      price,
      startDate: new Date(),
    });

    this.subscriptions.push({ userId, plan });
    this.revenue += price;

    // Notify
    await this.email.send({
      to: userId,
      subject: 'Welcome!',
      html: `<h1>You're on ${plan}</h1>`,
    });
  }

  async cancel(userId: string) {
    await this.db.collection('subs').deleteOne({ userId });

    this.subscriptions = this.subscriptions.filter((s) => s.userId !== userId);
  }

  getRevenue(): number {
    return this.revenue;
  }
}

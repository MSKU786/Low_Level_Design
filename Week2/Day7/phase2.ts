import { MongoClient } from 'mongodb';
import { SendGrid } from '@sendgrid/mail';
import { Stripe } from 'stripe';

class SubscriptionService {
  // ❌ Dependency Inversion Principle (DIP) Violation
  // High-level class directly depends on concrete implementations.
  // Fix: Inject interfaces/abstractions through constructor dependency injection.
  db = new MongoClient('mongodb://localhost');
  email = new SendGrid('SG_KEY');
  stripe = new Stripe('sk_test_123');

  // ❌ Type Safety / Generic OOP Violation
  // Using `any[]` removes compile-time type safety.
  // Fix: Create a Subscription interface/type.
  subscriptions: any[] = [];

  // ❌ Encapsulation Violation
  // Internal mutable state is publicly accessible.
  // Fix: Make fields private and expose controlled methods/getters.
  revenue: number = 0;

  async subscribe(userId: string, plan: string) {
    // ❌ Open/Closed Principle (OCP) Violation
    // Adding a new plan requires modifying this validation logic.
    // Fix: Use configuration/maps/strategy objects instead of hardcoded conditions.
    if (plan !== 'basic' && plan !== 'pro' && plan !== 'enterprise') {
      throw new Error('Invalid plan');
    }

    let price = 0;

    // ❌ Open/Closed Principle (OCP) Violation
    // Pricing logic is tightly coupled using if/else branching.
    // Fix: Move pricing into strategy classes or a plan-price mapping.
    if (plan === 'basic') {
      price = 10;
    } else if (plan === 'pro') {
      price = 25;
    } else if (plan === 'enterprise') {
      price = 100;
    }

    // ❌ Single Responsibility Principle (SRP) Violation
    // SubscriptionService is handling billing/payment logic itself.
    // Fix: Extract payment handling into a dedicated PaymentService.
    await this.stripe.charges.create({
      amount: price * 100,
      currency: 'usd',
    });

    // ❌ Single Responsibility Principle (SRP) Violation
    // Database persistence logic is mixed into business logic.
    // Fix: Move DB operations into a Repository/Data Access layer.
    await this.db.collection('subs').insertOne({
      userId,
      plan,
      price,
      startDate: new Date(),
    });

    // ❌ Encapsulation Violation
    // Internal state management is directly handled and mutable.
    // Fix: Keep state private and manage through dedicated methods.
    this.subscriptions.push({ userId, plan });
    this.revenue += price;

    // ❌ Single Responsibility Principle (SRP) Violation
    // Email notification logic is mixed into subscription workflow.
    // Fix: Extract notification/email sending into NotificationService.
    await this.email.send({
      to: userId,
      subject: 'Welcome!',
      html: `<h1>You're on ${plan}</h1>`,
    });
  }

  async cancel(userId: string) {
    // ❌ Single Responsibility Principle (SRP) Violation
    // Service directly performs persistence operations.
    // Fix: Delegate cancellation persistence to repository/service abstraction.
    await this.db.collection('subs').deleteOne({ userId });

    // ❌ Encapsulation Violation
    // Direct manipulation of internal collection state.
    // Fix: Hide collection mutations behind domain methods.
    this.subscriptions = this.subscriptions.filter((s) => s.userId !== userId);
  }

  getRevenue(): number {
    // ⚠ Potential Encapsulation Concern
    // Getter is okay, but revenue consistency depends on mutable shared state.
    // Fix: Derive revenue from transactions or protect mutation paths.
    return this.revenue;
  }
}

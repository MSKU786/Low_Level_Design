/*
Problem Statement: Real-Time Price Monitoring: 
Task:- Implement a class that simulates receiving price updates and processes them.

*/

import { EventEmitter } from 'events';

class Product extends EventEmitter {
  id: string;
  name: string;
  price: number;

  constructor(name: string, price: number) {
    super();
    this.id = Product.generateId();
    this.name = name;
    this.price = price;
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9); // Mock UUID generator
  }

  updatePrice(newPrice: number) {
    let oldPrice = this.price;
    this.price = newPrice;
    this.emit('price-update', this, oldPrice, newPrice);
  }
}

class User {
  id: string;
  firstName: string;
  lastName: string;
  wishlist: Map<string, number>; // Map of product id and price

  constructor(firstName: string, lastName: string) {
    this.id = User.generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.wishlist = new Map();
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addToWishlist(product: Product, price: number) {
    this.wishlist.set(product.id, price);
  }
}

class NotificationService {
  static sendPushNotification(
    user: User,
    product: Product,
    newPrice: number
  ): void {
    console.log(
      `Notification: Dear ${user.firstName}, the price of ${product.name} has dropped to ${newPrice}!`
    );
  }
}

class PriceTrackerSystem {
  private productListeners: Map<
    string,
    (product: Product, oldPrice: number, newPrice: number) => void
  >;
  private userSubscriptions: Map<string, Set<User>>; // Product id to set of users

  constructor() {
    this.productListeners = new Map();
    this.userSubscriptions = new Map();
  }

  subscribeUser(user: User, product: Product, thresholdPrice: number): void {
    // Add user subscription

    if (!this.userSubscriptions.has(product.id)) {
      this.userSubscriptions.set(product.id, new Set());
    }

    this.userSubscriptions.get(product.id)!.add(user);

    // Add product listener if not addded

    if (!this.productListeners.has(product.id)) {
      const listener = (
        product: Product,
        oldPrice: number,
        newPrice: number
      ) => {
        this.notifyUsers(product, oldPrice, newPrice);
      };
      product.on('price-update', listener);
      this.productListeners.set(product.id, listener);
      // User maintains wishlist locally
      user.addToWishlist(product, thresholdPrice);
    }
  }

  notifyUsers(product, oldPrice, newPrice) {
    const subscribedUsers = this.userSubscriptions.get(product.id);
    if (!subscribedUsers) return;

    for (const user of subscribedUsers) {
      const thresholdPrice = user.wishlist.get(product.id);
      if (thresholdPrice && newPrice <= thresholdPrice) {
        NotificationService.sendPushNotification(user, product, newPrice);
      }
    }
  }
}

const tracker = new PriceTrackerSystem();

const product1 = new Product('Laptop', 1000);
const product2 = new Product('Phone', 500);

const user1 = new User('Alice', 'Smith');
const user2 = new User('Bob', 'Brown');

// Users subscribe to price changes
tracker.subscribeUser(user1, product1, 950);
tracker.subscribeUser(user2, product2, 450);

// Trigger price updates
product1.updatePrice(940); // Notifies Alice
product2.updatePrice(440); // Notifies Bob

/*
Problem Statement: Real-Time Price Monitoring: 
Task:- Implement a class that simulates receiving price updates and processes them.

*/

import { EventEmitter } from 'events';

class Products extends EventEmitter {
  id: string;
  name: string;
  price: number;

  constructor(name: string, price: number) {
    super();
    this.id = Products.generateId();
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
}

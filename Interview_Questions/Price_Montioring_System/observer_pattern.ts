interface Observer {
  update(product: Product, newPrice: number): void; // Update method
}

class Product {
  id: string;
  name: string;
  price: number;

  private observers: Observer[];

  constructor(name: string, price: number) {
    this.id = Product.generateId();
    this.name = name;
    this.price = price;
    this.observers = [];
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this, this.price);
    }
  }

  updatePrice(newPrice: number): void {
    this.price = newPrice;
    this.notifyObservers();
  }
}

class User implements Observer {
  id: string;
  firstName: string;
  lastName: string;
  wishlist: Map<string, number>; // Map of product id and threshols price

  constructor(firstName: string, lastName: string) {
    this.id = User.generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.wishlist = new Map();
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addToWishlist(product: Product, thresholdPrice: number): void {
    product.attach(this);
    this.wishlist.set(product.id, thresholdPrice);
  }

  update(product: Product, newPrice: number): void {
    const thresholdPrice = this.wishlist.get(product.id);
    if (thresholdPrice !== undefined && newPrice <= thresholdPrice) {
      this.notifyUser(product, newPrice);
    }
  }

  private notifyUser(product: Product, newPrice: number): void {
    console.log(
      `Notification: Dear ${this.firstName}, the price of ${product.name} has dropped to ${newPrice}!`
    );
  }
}

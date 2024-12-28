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

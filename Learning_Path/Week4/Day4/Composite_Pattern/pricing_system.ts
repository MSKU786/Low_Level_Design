interface Priciable {
  readonly name: string;
  getPrice(): number;
  getDescription(indent?: string): string;
}

class Product implements Priciable {
  constructor(
    public readonly name: string,
    private readonly price: number,
  ) {}

  getPrice(): number {
    return this.price;
  }

  getDescription(indent=""): string {
    return `${indent}: ${this.name} : ${this.price}`
  }
}


class Bundle implements Priciable {
  private items: Priciable[] = [];
  private discountPercent : number;

  constructor (
    public readonly name: string,
    discountPercent: number = 0
  ) {
    this.discountPercent = discountPercent
  }


  add(item: Priciable) : this {
    this.items.push(item);
    return this;
  }

  getPrice(): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.getPrice(), 0);
    return Math.round(subtotal * (1 - this.discountPercent/100));
  }

  getDescription(indent?: string): string {
    const lines = [
      `${indent} ${this.name} (${this.discountPercent}% off): ${this.getPrice()}`,
      ...this.items.map(item => item.getDescription(indent + " "));
    ]

    return lines.join('\n')
  }
}


const laptop = new Product("Laptop", 80000);
const mouse = new Product("Mouse", 2000);
const keyboard = new Product("Keyboard", 5000);

const peripherals = new Bundle("Peripherals Pack", 10).add(mouse).add(keyboard);

const devSetup = new Bundle("Developer Setup", 5).add(laptop).add(peripherals).add(new Product("Monitor", 30000));



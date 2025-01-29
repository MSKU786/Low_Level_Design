abstract class Beverage {
  description: string = 'Unknown Bevergae';

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

// Implementing the condiments as decorators

abstract class CondimentDecorator extends Beverage {
  beverage: Beverage;
  abstract getDescription(): string;
}

// Coding Beverages

class Espresso extends Beverage {
  constructor() {
    super();
    this.description = 'Espresso';
  }

  cost() {
    return 1.99;
  }
}

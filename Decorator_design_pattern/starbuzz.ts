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

  cost(): number {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = 'House Blend Coffee';
  }

  cost(): number {
    return 0.89;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this.description = 'Dark Roast Coffee';
  }

  cost(): number {
    return 0.99;
  }
}

class Decaf extends Beverage {
  constructor() {
    super();
    this.description = 'Decaf Coffee';
  }

  cost(): number {
    return 1.05;
  }
}

// Coding Condiments

abstract class Beverage {
  description: string = 'Unknown Bevergae';

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

// Implementing the condiments as decorators

abstract class CondimentDecorator extends Beverage {
  beverage!: Beverage;
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
class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost() {
    return this.beverage.cost() + 0.2;
  }
}

class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', soy';
  }

  cost() {
    return this.beverage.cost() + 0.15;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', whip';
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

class SteamedMilk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', steamed milk';
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

// Testing the code

class StarbuzzCoffee {
  static main(): void {
    let beverage: Beverage = new Espresso();
    console.log(`${beverage.getDescription()}, ${beverage.cost()}`);

    let beverage2: Beverage = new DarkRoast();
    beverage2 = new Mocha(beverage2);
    beverage2 = new Whip(beverage2);
    console.log(`${beverage2.getDescription()}, ${beverage2.cost()}`);

    let beverage3: Beverage = new HouseBlend();
    beverage3 = new Soy(beverage3);
    beverage3 = new Mocha(beverage3);
    beverage3 = new Whip(beverage3);

    console.log(`${beverage3.getDescription()}, ${beverage3.cost()}`);
  }
}

StarbuzzCoffee.main();

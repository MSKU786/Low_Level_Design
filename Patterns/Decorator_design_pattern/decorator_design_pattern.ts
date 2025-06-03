// Coffee interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Creating a concrete component basiccofff which implements coffee
class BasicCoffee implements Coffee {
  cost(): number {
    return 2.0; // Base price for plain coffee
  }

  description(): string {
    return 'Basic Coffee';
  }
}

//Creating a abstract decorator class

class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Create concrete decorator
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.5;
  }

  description(): string {
    return this.coffee.description() + ', Milk';
  }
}

//Sugar Decorator
class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.2;
  }

  description(): string {
    return this.coffee.description() + ', Sugar';
  }
}

//cream decorator

class CreamDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.3;
  }

  description(): string {
    return this.coffee.description() + ', Cream';
  }
}

let coffee: Coffee = new BasicCoffee();
console.log(coffee.description()); // Output: Basic Coffee
console.log(`Cost: $${coffee.cost()}`); // Output: Cost: $2.0

coffee = new MilkDecorator(coffee);
console.log(coffee.description()); // Output: Basic Coffee, Milk
console.log(`Cost: $${coffee.cost()}`); // Output: Cost: $2.5

coffee = new SugarDecorator(coffee);
console.log(coffee.description()); // Output: Basic Coffee, Milk, Sugar
console.log(`Cost: $${coffee.cost()}`); // Output: Cost: $2.7

coffee = new CreamDecorator(coffee);
console.log(coffee.description()); // Output: Basic Coffee, Milk, Sugar, Cream
console.log(`Cost: $${coffee.cost()}`); // Output: Cost: $3.4

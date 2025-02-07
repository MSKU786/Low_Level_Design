abstract class PizzaStore {
  public orderPizza(type: string): Pizza | null {
    const pizza = this.createPizza(type);
    return pizza;
  }

  protected abstract createPizza(type: string): Pizza | null;
}

class NYPizzaStore extends PizzaStore {
  protected createPizza(type: string): Pizza | null {
    if (type === 'cheese') {
      return new NYStyleCheesePizza();
    } else if (type === 'veggie') {
      return new NYStyleVeggiePizza();
    } else {
      return null;
    }
  }
}

class ChicagoPizzaStore extends PizzaStore {
  protected createPizza(type: string): Pizza | null {
    if (type === 'cheese') {
      return new ChicagoStyleCheesePizza();
    } else if (type === 'veggie') {
      return new ChicagoStyleVeggiePizza();
    } else {
      return null;
    }
  }
}

// Start with an abstract Pizza class and all the concrete pizza classes will extend this class
abstract class Pizza {
  name: string;
  dough: string;
  sauce: string;
  toppings: string[] = [];

  // prepare follows a number of steps in a particular sequence(template method)
  prepare() {
    console.log('Preparing ' + name);
    console.log('Tossing dough...');
    console.log('Adding sauce....');
    console.log('Adding toppings: ');
    for (let topping of this.toppings) {
      console.log(' ' + topping);
    }
  }

  // the abstract class provide some basic defaults like bake , cut and box
  bake() {
    console.log('Bake for 25  mintues of 350');
  }

  cut() {
    console.log('Cutting the pizza into diagonal slices');
  }

  box() {
    console.log('Place pizza in officical Pizzastore box');
  }

  getName(): string {
    return this.name;
  }
}

class NYStyleCheesePizza extends Pizza {
  public NYStyleChessePizza() {
    this.name = 'NY Style Sauce and Cheese Pizza';
    this.dough = 'Thin Crust Dough';
    this.sauce = 'Marinara Sauce';

    this.toppings.push('grated Reggiano Cheese');
  }
}
class NYStyleVeggiePizza extends Pizza {
  public NYStyleChessePizza() {
    this.name = 'NY Style Sauce and Veggie Pizza';
    this.dough = 'Thin Crust Dough';
    this.sauce = 'Marinara Sauce';

    this.toppings.push('grated Reggiano Veggie');
  }
}

class ChicagoStyleCheesePizza extends Pizza {
  public ChicagoStyleCheesePizza() {
    this.name = 'Chicago Style Deep Dish Cheese Pizza';
    this.dough = 'Extra Thick Crush Dough';
    this.sauce = 'Plum Tomato Sauce';
    this.toppings.push('Shredded Mozzarella Cheese');
  }

  // Overriding the default cut method
  cut() {
    console.log('Cutting the pizza into square slices');
  }
}

class ChicagoStyleVeggiePizza extends Pizza {
  public ChicagoStyleVeggiePizza() {
    this.name = 'Chicago Style Deep Dish Veggie Pizza';
    this.dough = 'Extra Thick Crush Dough';
    this.sauce = 'Plum Tomato Sauce';
    this.toppings.push('Shredded Mozzarella Veggie');
  }

  // Overriding the default cut method
  cut() {
    console.log('Cutting the pizza into square slices');
  }
}

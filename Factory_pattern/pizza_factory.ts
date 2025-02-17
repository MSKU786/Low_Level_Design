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
  name!: string;
  dough!: string;
  sauce!: string;
  toppings: string[] = [];

  // prepare follows a number of steps in a particular sequence(template method)
  prepare() {
    console.log('Preparing ' + this.name);
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

interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createPepperoni(): Pepperoni;
  createVeggies(): Veggies[];
  createClam(): Clam;
}

interface Dough {
  getDescription(): string;
}

interface Sauce {
  getDescription(): string;
}

interface Cheese {
  getDescription(): string;
}

interface Pepperoni {
  getDescription(): string;
}

interface Clam {
  getDescription(): string;
}

interface Veggies {
  getDescription(): string;
}

class ThinCrustDough implements Dough {
  getDescription(): string {
    return "Thin Crust Dough";
  }
}

class MarinaraSauce implements Sauce {

}

class ReggianoCheese implements Cheese {

}

class Garlic implements Veggies {

}

class Onion implements Veggies {

}

class Mushroom implements Veggies {

}

class SlicedPepperoni implements Pepperoni {

}

class FreshClams implements Clam {

}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
    createDough() : Dough {
      return new ThinCrustDough();
    }

    createSauce() : Sauce {
      return new MarinaraSauce();
    }

    createCheese(): Cheese {
      return new ReggianoCheese();
    }

    createVeggies() : Veggies[] {
      let veggies: Veggies[]  = {new Garlic(), new Onion(), new Mushroom()}
      return veggies;
    }

    createPepperoni() : Pepperoni{
      return new SlicedPepperoni();
    }

    createClam(): Clam {
      return new FreshClams();
    }
}


class PizzaTestDrive {
  public static main() {
    let nyStore: PizzaStore = new NYPizzaStore();
    let chicagoStore: PizzaStore = new ChicagoPizzaStore();

    let pizza: Pizza | null = nyStore.orderPizza('cheese');
    console.log('Ethan ordered a ' + pizza?.getName() + '\n');

    pizza = chicagoStore.orderPizza('veggie');
    console.log('Joel ordered a ' + pizza?.getName() + '\n');
  }
}

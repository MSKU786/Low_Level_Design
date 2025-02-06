abstract class PizzaStore {
  public orderPizza(type: string): Pizza {
    const pizza = this.createPizza(type);
  }

  protected abstract createPizza(type: string): Pizza;
}

abstract class Pizza {
  name: string;
  dough: string;
  sauce: string;
  toppings: string[] = [];

  prepare() {
    console.log('Preparing ' + name);
    console.log('Tossing dough...');
    console.log('Adding sauce....');
    console.log('Adding toppings: ');
    for (let topping of this.toppings) {
      console.log(' ' + topping);
    }
  }

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

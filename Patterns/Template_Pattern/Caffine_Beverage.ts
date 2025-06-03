// Template method with Hook
// Encapsultate interchangeable behaviours and use delegation to decide which behaviour to use.
abstract class CaffineBeverage {
  prepareRecipe(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.cusotomerWantCondiments()) this.addCondiments();
  }

  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater(): void {}
  pourInCup(): void {}

  cusotomerWantCondiments(): boolean {
    return true;
  }
}

class CoffeeWithHook extends CaffineBeverage {
  brew(): void {
    console.log('Dripping coffee through filter');
  }

  addCondiments(): void {
    console.log('Adding Sugar and Milk');
  }

  cusotomerWantCondiments(): boolean {
    return confirm('Do you want milk and sugar?');
  }
}

class TeaWithHook extends CaffineBeverage {
  brew(): void {
    console.log('Steep tea in boiling water');
  }

  addCondiments(): void {
    console.log('Add lemons');
  }

  cusotomerWantCondiments(): boolean {
    return confirm('Do you want lemons?');
  }
}

class Coffee extends CaffineBeverage {
  brew(): void {
    console.log('Dripping coffee through filter');
  }

  addCondiments(): void {
    console.log('Adding Sugar and Milk');
  }
}

class Tea extends CaffineBeverage {
  brew(): void {
    console.log('Steep tea in boiling water');
  }

  addCondiments(): void {
    console.log('Add lemons');
  }
}

class BeverageTestDrive {
  static main() {
    let coffee: Coffee = new Coffee();
    coffee.prepareRecipe();

    let tea: Tea = new Tea();
    tea.prepareRecipe();

    let coffeeWithhook: CoffeeWithHook = new CoffeeWithHook();
    coffeeWithhook.prepareRecipe();

    let teaWithHook: TeaWithHook = new TeaWithHook();
    teaWithHook.prepareRecipe();
  }
}

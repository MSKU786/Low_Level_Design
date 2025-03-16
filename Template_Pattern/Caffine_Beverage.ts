// Template method with Hook
//
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
  }
}

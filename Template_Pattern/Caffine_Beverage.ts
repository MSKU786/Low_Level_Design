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

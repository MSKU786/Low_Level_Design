abstract class Duck {
  flyBehaviour: FlyBehaviour;
  quackBehavior: QuackBehaviour;

  abstract display(): void;

  performFly() {
    this.flyBehaviour.fly();
  }

  performQuack() {
    this.quackBehavior.quack();
  }

  swim() {
    console.log('All duck swim, even decoys!');
  }
}

interface FlyBehaviour {
  fly(): void;
}

interface QuackBehaviour {
  quack(): void;
}

class MallardDuck extends Duck {
  display(): void {}
}

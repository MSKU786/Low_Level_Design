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

class FlyWithWings implements FlyBehaviour {
  fly(): void {
    console.log('I am flying');
  }
}

class FlyNoWay implements FlyBehaviour {
  fly(): void {
    console.log("I can't fly");
  }
}

interface QuackBehaviour {
  quack(): void;
}

class Quack implements QuackBehaviour {
  quack(): void {
    console.log('Quack Quack');
  }
}

class MuteQuack implements QuackBehaviour {
  quack(): void {
    console.log('Silence');
  }
}

class Squeak implements QuackBehaviour {
  quack(): void {
    console.log('Squeak');
  }
}

class MallardDuck extends Duck {
  constructor() {
    super();
    this.quackBehavior = new Quack();
    this.flyBehaviour = new FlyWithWings();
  }
  display(): void {
    console.log('I am real Mailward Duck');
  }
}

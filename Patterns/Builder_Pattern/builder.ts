class Car {
  private engine: string;
  private wheels: number;
  private seats: number;
  private color: string;
  private sunRoof: boolean;
  private navigationSystem: boolean;

  constructor(engine, wheels, seats, color, sunRoof, navigatonSystem) {
    this.engine = engine;
    this.color = color;
    this.wheels = wheels;
    this.seats = seats;
    this.sunRoof = sunRoof;
    this.navigationSystem = navigatonSystem;
  }
}

// Problem wtih the aove aporach

/*
Problem #1: Passing Unnecessary Values 🛑
When you need to set optional attributes, such as sunroof or navigation system, you have to pass values for all parameters, even if they aren't necessary.

Car car = new Car("V8", 4, 5, "Red", false, false); // The client needs to pass `false` for optional attributes
‍

Problem #2: Constructor Overloading and Huge Combinations ⚒️
If a car has many optional attributes, you end up with multiple constructors, each for different combinations of parameters. This results in code duplication and leads to messy and unmanageable code.

*/

class ICar {
  private engine: string;
  private wheels: number;
  private seats: number;
  private color: string;
  private sunRoof: boolean;
  private navigationSystem: boolean;

  // Make constructor private so that only Builder can create a Car
  protected constructor(builder: CarBuilder) {
    this.engine = builder.engine;
    this.wheels = builder.wheels;
    this.seats = builder.seats;
    this.color = builder.color;
    this.sunRoof = builder.sunRoof;
    this.navigationSystem = builder.navigationSystem;
  }

  // Expose a static method to start building
  static builder() {
    return new CarBuilder();
  }

  // Example method
  displayInfo() {
    console.log(
      `Engine: ${this.engine}, Wheels: ${this.wheels}, Seats: ${this.seats}, Color: ${this.color}, Sunroof: ${this.sunRoof}, Navigation: ${this.navigationSystem}`
    );
  }
}

// Separate Builder class
class CarBuilder {
  engine!: string;
  wheels: number = 4;
  seats: number = 4;
  color: string = 'black';
  sunRoof: boolean = false;
  navigationSystem: boolean = false;

  setEngine(engine: string) {
    this.engine = engine;
    return this;
  }

  setWheels(wheels: number) {
    this.wheels = wheels;
    return this;
  }

  setSeats(seats: number) {
    this.seats = seats;
    return this;
  }

  setColor(color: string) {
    this.color = color;
    return this;
  }

  setSunRoof(hasSunRoof: boolean) {
    this.sunRoof = hasSunRoof;
    return this;
  }

  setNavigationSystem(hasNavigation: boolean) {
    this.navigationSystem = hasNavigation;
    return this;
  }

  build(): ICar {
    return new ICar(this);
  }
}

// ✅ Usage:
const myCar = ICar.builder()
  .setEngine('V8')
  .setColor('red')
  .setSunRoof(true)
  .setNavigationSystem(true)
  .build();

myCar.displayInfo();

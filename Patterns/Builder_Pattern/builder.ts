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

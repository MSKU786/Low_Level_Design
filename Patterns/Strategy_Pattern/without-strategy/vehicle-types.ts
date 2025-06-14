class Vehicle {
  drive(): void {
    console.log('This is our normal driving behaviour');
  }
}

class GoodsVehicle extends Vehicle {}

class PassengerVehicle extends Vehicle {}

class SportsVehicle extends Vehicle {
  drive(): void {
    console.log('This is out sport driving behaviour');
  }
}

class OffRoadVehicle extends Vehicle {
  // This is the problem we are duplicating the code for the sport driving behaviour
  drive(): void {
    console.log('This is our sport driving behaviour');
  }
}

class MilitaryVehicle extends Vehicle {}

function main() {
  const goodsVehicle = new GoodsVehicle();
  goodsVehicle.drive(); // This is our normal driving behaviour

  const passengerVehicle = new PassengerVehicle();
  passengerVehicle.drive(); // This is our normal driving behaviour

  const sportsVehicle = new SportsVehicle();
  sportsVehicle.drive(); // This is our sport driving behaviour

  const offRoadVehicle = new OffRoadVehicle();
  offRoadVehicle.drive(); // This is our sport driving behaviour
}

main();

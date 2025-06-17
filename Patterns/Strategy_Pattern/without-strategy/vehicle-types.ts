class Vehicles {
  drive(): void {
    console.log('This is our normal driving behaviour');
  }
}

class GoodsVehicles extends Vehicles {}

class PassengerVehicles extends Vehicles {}

class SportsVehicles extends Vehicles {
  drive(): void {
    console.log('This is out sport driving behaviour');
  }
}

class OffRoadVehicles extends Vehicles {
  // This is the problem we are duplicating the code for the sport driving behaviour
  drive(): void {
    console.log('This is our sport driving behaviour');
  }
}

class MilitaryVehicles extends Vehicles {}

function main() {
  const goodsVehicles = new GoodsVehicles();
  goodsVehicles.drive(); // This is our normal driving behaviour

  const passengerVehicles = new PassengerVehicles();
  passengerVehicles.drive(); // This is our normal driving behaviour

  const sportsVehicles = new SportsVehicles();
  sportsVehicles.drive(); // This is our sport driving behaviour

  const offRoadVehicles = new OffRoadVehicles();
  offRoadVehicles.drive(); // This is our sport driving behaviour
}

main();

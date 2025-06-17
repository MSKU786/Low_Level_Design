class Vehicle {
  driveStrat: driveStrategy;

  constructor(driveStrat: driveStrategy) {
    this.driveStrat = driveStrat;
  }

  drive() {
    this.driveStrat.drive();
  }
}

interface driveStrategy {
  drive();
}

class NormalDriveStrategcy implements driveStrategy {
  drive() {
    console.log('Normal Drive stategcy');
  }
}

class SportsDriveStratecy implements driveStrategy {
  drive() {
    console.log('Sports Drive strategy');
  }
}

class GoodsVehicle extends Vehicle {}

class PassengerVehicle extends Vehicle {}

class OffRoadVehicle extends Vehicle {}

function main2() {
  let goodVehicle = new GoodsVehicle(new NormalDriveStrategcy());
  goodVehicle.drive();

  let offRoadVehicles = new OffRoadVehicle(new SportsDriveStratecy());
  offRoadVehicles.drive();
}

interface VehicleFactory {
  createEngine(): Engine;
  createSuspension(): Suspension;
  createBrake(): Brake;
  createTire(): Tire;
}

interface Engine {}

interface Suspension {}

interface Brake {}

interface Tire {}

class SportsEngine implements Engine {}

class SportsSuspension implements Suspension {}

class SportBrakes implements Brake {}

class SportTire implements Tire {}

class SportCarFactory implements VehicleFactory {
  createEngine(): SportsEngine {
    return new SportsEngine();
  }

  createBrake(): SportBrakes {
    return new SportBrakes();
  }

  createTire(): SportTire {
    return new SportTire();
  }

  createSuspension(): SportsSuspension {
    return new SportsSuspension();
  }
}

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

class SportsBrakes implements Brake {}

class SportsTire implements Tire {}

class SportsCarFactory implements VehicleFactory {
  createEngine(): SportsEngine {
    return new SportsEngine();
  }

  createBrake(): SportsBrakes {
    return new SportsBrakes();
  }

  createTire(): SportsTire {
    return new SportsTire();
  }

  createSuspension(): SportsSuspension {
    return new SportsSuspension();
  }
}

class ComfortEngine implements Engine {}

class ComfortSuspension implements Suspension {}

class ComfortBrakes implements Brake {}

class ComfortTire implements Tire {}

class ComfortCarFactory implements VehicleFactory {
  createEngine(): ComfortEngine {
    return new ComfortEngine();
  }

  createBrake(): ComfortBrakes {
    return new ComfortBrakes();
  }

  createTire(): ComfortTire {
    return new ComfortTire();
  }

  createSuspension(): ComfortSuspension {
    return new ComfortSuspension();
  }
}

class OffroadEngine implements Engine {}

class OffroadSuspension implements Suspension {}

class OffroadBrakes implements Brake {}

class OffroadTire implements Tire {}

class OffroadCarFactory implements VehicleFactory {
  createEngine(): OffroadEngine {
    return new OffroadEngine();
  }

  createBrake(): OffroadBrakes {
    return new OffroadBrakes();
  }

  createTire(): OffroadTire {
    return new OffroadTire();
  }

  createSuspension(): OffroadSuspension {
    return new OffroadSuspension();
  }
}

class VwhicleFactoryRegistry {
  private factories = new Map<string, VehicleFactory>();

  register(family: string, factory: VehicleFactory): void {
    this.factories.set(family, factory);
  }

  get(family: string): VehicleFactory {
    const factory = this.factories.get(family);

    if (!factory) {
      throw new Error(`Unkonw factory type ${factory}`);
    }

    return factory;
  }
}

interface VehicleSpec {
  type: string;
  maxPassenger: number;
  cargoCapacity: number;
  basePrice: number;
}

class VehicleTypeRegistry {
  private specs = new Map<string, VehicleSpec>();

  register(type: string, spec: VehicleSpec): void {
    this.specs.set(type, spec);
  }

  get(type: string): VehicleSpec {
    const spec = this.specs.get(type);
    if (!spec) throw new Error(`Unkonw Vehichle type: ${type}`);
    return spec;
  }
}

class VehichleBuilder {
  private specs?: VehicleSpec;
  private factory?: VehicleFactory;
  private color = 'white';
  private features: string[];

  constructor(
    private vehicleTypeRegistry: VehicleTypeRegistry,
    private factory: VwhicleFactoryRegistry,
  ) {}

  setType(type: string) {
    this.specs = this.vehicleTypeRegistry.get(type);
    return this;
  }

  setFactory(family: string): this {
    this.factory = this.factory.get(family);
    return this;
  }
}

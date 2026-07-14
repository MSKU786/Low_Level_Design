/*
Design from Scratch – PC Builder System
Requirements
1. PC Types

The system supports multiple PC types.

Current types:

Gaming
Workstation
Budget

Each PC type has:

Different base price
Different specifications
Maximum RAM
Maximum storage slots

New PC types may be added every year.

2. Component Families

The system supports two component families:

Intel-based
AMD-based
Intel Family
Intel CPU
Intel-compatible motherboard
DDR5 RAM
Intel cooler
AMD Family
AMD CPU
AMD-compatible motherboard
DDR5 RAM
AMD cooler

Constraint:

Intel CPU cannot be paired with an AMD motherboard.
AMD CPU cannot be paired with an Intel motherboard.
The component family must remain consistent throughout the build.
3. PC Configuration

A PC consists of:

Required

PC Type
Component Family

Configurable / Optional

Storage (SSD/HDD, capacity)
GPU
Extra RAM
Peripherals
Monitor
Keyboard
Mouse
Warranty Plan
Operating System
Windows
Linux
None

Most customers select only 3–4 options out of the 10+ available customization options.

4. Pre-built Packages

The store offers ready-made PC packages.

Pro Gamer
Gaming PC
Intel family
RTX 4090 GPU
32 GB RAM
1 TB SSD
Windows
Developer
Workstation
AMD family
64 GB RAM
2 TB SSD
Linux
Extended Warranty
Student
Budget PC
AMD family
8 GB RAM
256 GB SSD
No GPU

Customers can:

Start with a pre-built package.
Customize it further (e.g., upgrade GPU, add a monitor).

Constraint:

Two customers selecting the same package should receive independent copies. Customizing one package must not affect the other.
5. Application Configuration

The application has global configuration values:

Tax rate
Currency
Store name
Free shipping threshold

These values are:

Loaded once during application startup.
Shared across all services.
*/

interface ComponentFamilyFactory {
  installCPU(): CPU;
  installMotherboard(): Motherboard;
  installRAM(): RAM;
  installCooler(): Cooler;
}

interface CPU {}

interface Motherboard {}

interface RAM {}

interface Cooler {}

class AMDCPU implements CPU {}
class AMDMotherboard implements Motherboard {}
class AMDRAM implements RAM {}
class AMDCooler implements Cooler {}

class IntelCPU implements CPU {}
class IntelMotherboard implements Motherboard {}
class IntelRAM implements RAM {}
class IntelCooler implements Cooler {}

class AMDVendor implements ComponentFamilyFactory {
  installCPU(): AMDCPU {
    return new AMDCPU();
  }

  installMotherboard(): AMDMotherboard {
    return new AMDMotherboard();
  }

  installRAM(): AMDRAM {
    return new AMDRAM();
  }

  installCooler(): AMDCooler {
    return new AMDCooler();
  }
}

class IntelVendor implements ComponentFamilyFactory {
  installCPU(): IntelCPU {
    return new IntelCPU();
  }

  installMotherboard(): IntelMotherboard {
    return new IntelMotherboard();
  }

  installRAM(): IntelRAM {
    return new IntelRAM();
  }

  installCooler(): IntelCooler {
    return new IntelCooler();
  }
}

class ComponentFamilyFactoryRegistry {
  private vendors: Map<string, ComponentFamilyFactory> = new Map<
    string,
    ComponentFamilyFactory
  >();

  register(name: string, vendor: ComponentFamilyFactory): void {
    this.vendors.set(name, vendor);
  }

  get(env: string): ComponentFamilyFactory {
    const vendor = this.vendors.get(env);

    if (!vendor) {
      throw new Error(`Unknow vendor type ${env}`);
    }

    return vendor;
  }
}

interface Clonable<T> {
  clone(): T;
}

interface Storage {
  capcity: number;
  SDD?: number;
  HDD?: number;
}

class PCConfig implements Clonable<PCConfig> {
  constructor(
    public type: string,
    public componentFamily: string,
    public storage: Storage,
    public ram: number,
    public gpu: string | null,
    public os: string | null,
    public peripherals: string[],
    public waranty: string | null,
  ) {}

  clone(): PCConfig {
    return new PCConfig(
      this.type,
      this.componentFamily,
      { ...this.storage },
      this.ram,
      this.gpu,
      this.os,
      [...this.peripherals],
      this.waranty,
    );
  }
}

class PCConfigRegistry {
  private pcConfig = new Map<string, PCConfig>();

  register(name: string, config: PCConfig): void {
    this.pcConfig.set(name, config);
  }

  get(name: string): PCConfig {
    const config = this.pcConfig.get(name);
    if (!config) throw new Error(`Uknow template: ${config}`);
    return config.clone();
  }
}

interface PCSpecs {
  RAMinGB: number;
  StorageSlots: number;
}

interface PCTypeFactory {
  buildPC(basePrice: number, pcSpecs: PCSpecs): Promise<void>;
}

class GamingPC implements PCTypeFactory {
  buildPC(basePrice: number, pcSpecs: PCSpecs): Promise<void> {
    return Promise.resolve();
  }
}

class WorkStation implements PCTypeFactory {
  buildPC(basePrice: number, pcSpecs: PCSpecs): Promise<void> {
    return Promise.resolve();
  }
}

class BudgetPC implements PCTypeFactory {
  buildPC(basePrice: number, pcSpecs: PCSpecs): Promise<void> {
    return Promise.resolve();
  }
}

class PCFactoryRegistry {
  private types = new Map<string, PCTypeFactory>();

  register(type: string, PCTypeFactory: PCTypeFactory) {
    this.types.set(type, PCTypeFactory);
  }

  create(type: string): PCTypeFactory {
    let pcType = this.types.get(type);
    if (!pcType) {
      throw new Error(`Invalid PC ${type}`);
    }

    return pcType;
  }
}

// ---------- The actual Product the Builder assembles ----------
// This was missing entirely — the abstract factory produced CPU/Motherboard/
// RAM/Cooler instances that had nowhere to live.
interface AssembledComponents {
  cpu: CPU;
  motherboard: Motherboard;
  ramSticks: RAM[];
  cooler: Cooler;
}

class PC {
  constructor(
    public type: string,
    public componentFamily: string,
    public components: AssembledComponents,
    public storage: Drive | null,
    public gpu: string | null,
    public os: string | null,
    public peripherals: string[],
    public warranty: string | null,
    public price: number,
    public specs: PCSpecs,
  ) {}
}

class PCBuilder {
  private componentRegistry: ComponentFamilyFactoryRegistry;
  private typeRegistry: PCFactoryRegistry;
  private vendor: ComponentFamilyFactory;
  private _storage: Storage;
  private _ram: number;
  private _gpu: string | null;
  private _os: string | null;
  private _peripherals: string[] = [];
  private _warranty: string | null;
  private _cpu: CPU;
  private _motherboard: Motherboard;
  private _ramStick: RAM;
  private _cooler: Cooler;

  constructor(
    type: string,
    family: string,
    componentRegistry: ComponentFamilyFactoryRegistry,
    typeRegistry: PCFactoryRegistry,
  ) {
    this.componentRegistry = componentRegistry;
    this.typeRegistry = typeRegistry;

    this.vendor = componentRegistry.get(family);
    this._familyType = typeRegistry.create(type);
    this._cpu = this.vendor.installCPU();
    this._ramStick = this.vendor.installRAM();
    this._motherboard = this.vendor.installMotherboard();
    this._cooler = this.vendor.installCooler();
  }

  static fromPCConfig(
    pcConfig: PCConfig,
    componentRegistry: ComponentFamilyFactoryRegistry,
    typeRegistry: PCFactoryRegistry,
  ) {
    const builder = new PCBuilder(componentRegistry, typeRegistry);
    builder._pcConfigName = pcConfig.name;
    builder._type = pcConfig.type;
    builder._componentFamily = pcConfig.componentFamily;
    builder._storage = { ...pcConfig.storage };
    builder._ram = pcConfig.ram;
    builder._gpu = pcConfig.gpu;
    builder._os = pcConfig.os;
    builder._peripherals = [...pcConfig.peripherals];
    builder._warranty = pcConfig.waranty;
  }

  withStorage(storage: Drive): this {
    this._storage = storage;
    return this;
  }

  withGPU(gpu: string): this {
    this._gpu = gpu;
    return this;
  }

  withExtraRAM(ram: number): this {
    this._ram += ram;
    return this;
  }

  withPeripheral(peripheral: string): this {
    this._peripherals.push(peripheral);
    return this;
  }

  withOS(os: string): this {
    this._os = os;
    return this;
  }

  withWarranty(warranty: string): this {
    this._warranty = warranty;
    return this;
  }

  buildPC(): PC {
    return new PC(
      this._type,
      this._componentFamily,
      {
        cpu: this._cpu,
        motherboard: this._motherboard,
        ram: this._ram,
        cooler: this._cooler,
      },
      this._storage,
      this._gpu,
      this._os,
      this._peripherals,
      this._warranty,
      this._typeProfile.basePrice,
      specs,
    );
  }
}

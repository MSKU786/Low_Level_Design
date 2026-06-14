interface IConfig {
  get<T>(key: string): T;
}

interface PluginConfig {
  type: string;
  enalbed: boolean;
  setting: Record<string, unknown>;
}

class ConfigMananger {
  private config: Record<string, any> = {};
  private static instance: ConfigMananger | null = null;
  private constructor() {}

  static getInstance() {
    if (!ConfigMananger.instance)
      ConfigMananger.instance = new ConfigMananger();
    return ConfigMananger.instance;
  }

  loadFromEnv(): void {
    this.config = {
      plugins: ['analytics', 'logging'],
      dbUrl: process.env.DB_URL,
    };
  }

  loadFromFile(path: string): void {}

  get<T>(key: string) {
    return this.config[key] as T;
  }

  static resetForTesting(): void {
    ConfigMananger.instance = null;
  }
}

// Factory Method

// Build a plugin system
// 1. Plugins are created based on a type of string form a config file
// 2. Pluygin types; "analytics', "logging", "caching", "auth"
// 3. Each Plugin implemnts a Pluign interface with initalize() and execute()
// 4. usE a registry factory -- adding a new plugin typeo requrieds zero edits
// 5. the plugin manager loads plugin from config and intialized them

interface Plugin {
  readonly name: string;
  readonly versoin: string;
  initalize(settings: Record<string, unknown>): Promise<void>;
  execute(context: Record<string, unknown>): Promise<void>;
  destroy(): Promise<void>;
}

class AnalyticsPlugin implements Plugin {
  readonly name: string = 'analytics';
  readonly versoin: string = '1.0.0';
  private endpoint: string = '';

  async initalize(settings: Record<string, unknown>): Promise<void> {
    this.endpoint =
      (settings.endpoint as string) ?? 'https://analytics.exmaple.com';
    console.log(` [Analytics] Initalized -> ${this.endpoint}`);
  }

  async execute(context: Record<string, unknown>): Promise<void> {
    console.log('Analtyics tracking event');
  }

  async destroy(): Promise<void> {
    console.log(`[Analytics] shutting down`);
  }
}

class LoggingPlugin implements Plugin {
  readonly name: string = 'logging';
  readonly versoin: string = '1.0.0';
  private endpoint: string = '';

  async initalize(settings: Record<string, unknown>): Promise<void> {
    this.endpoint =
      (settings.endpoint as string) ?? 'https://logging.exmaple.com';
    console.log(` [Logging] Initalized -> ${this.endpoint}`);
  }

  async execute(context: Record<string, unknown>): Promise<void> {
    console.log(`[Analtyics] tracking event -> ${this.name}`);
  }

  async destroy(): Promise<void> {
    console.log(`[Logging] shutting down`);
  }
}


class PluginFactory {
  private creators = new Map<string, () => Plugin>();

  register(type: string, strategy: () => Plugin): void {
    this.creators.set(type, strategy);
  }

  create(method: string): Plugin {
    const creator = this.creators.get(method);
    if (!creator) throw new Error(`Unknow ${method}`);
    return creator();
  }

  getRegisteedTypes(): string[] {
    return [...this.creators.keys()]
  }
}

class PluginManager {
  private activePlugin: Plugin[] = [];

  constructor(
    private config: IConfig;
    private factory: PluginFactory;
  ) {}


  // Read config -> create plugin -> initalize all
  async loadPlugins(): Promise<void> {
    const PluginConfigs = this.config.get<PluginConfig[]>("plugins");

    console.log(`Loading ${PluginConfigs.length} plugin(s)....`)

    for (const plugConfig of PluginConfigs) {
      if (!plugConfig.enalbed) {
        console.log( ` Skipping disbled plugin: ${plugConfig.type}`)
        continue;
      }

      const plugin = this.factory.create(plugConfig.type);
      await plugin.initalize(plugConfig.setting);
      this.activePlugin.push(plugin); 
    }

    console.log(`${this.activePlugin.length} pluing(s) loaded and intialzed\n`)
  }

  
}


interface IConfig {
  get<T>(key: string): T;
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

class PluginFactory {
  private pluggers = new Map<string, () => PluginStrategy>();

  register(type: string, strategy: () => PluginStrategy): void {
    this.pluggers.set(type, strategy);
  }

  create(method: string): PluginStrategy {
    const creator = this.pluggers.get(method);
    if (!creator) throw new Error(`Unknow ${method}`);
    return creator;
  }
}

interface Plugin {
  intialize(): void;
  execute(): void;
}

class AnalyticsPlugin implements Plugin {
  intialize(): void {}

  execute(): void {}
}

class AuthPlugin implements Plugin {
  intialize(): void {}

  execute(): void {}
}

class PluginManager {
  constructor(private configManger: IConfig) {}
}

const config = ConfigMananger.getInstance();
config.lo;

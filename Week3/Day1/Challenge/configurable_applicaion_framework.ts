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

interface Plugin {
  readonly name: string;
  readonly version: string;
  intialize(config: PluginConfig): Promise<void>;
  execute(context: PluginContext): Promise<PluginResult>;
  destroy(): Promise<void>;
}

// Abstract class - shared lifecycle management
abstract class BasePlugin implements Plugin {
  abstract readonly name: string;
  abstract readonly version: string;
  protected intialized = false;
  protected config: PluginConfig;

  // Shard: Lifecycle guard + config storage 
  async intialize(config: PluginConfig): Promise<void> {
    
  }

  // Shared: Guard against uninitalized execution
  async execute(context: PluginContext): Promise<PluginResult> {
    return this.onExecute(context);
  }

  async destroy(): Promise<void> {
    await this.onDestroy()
    this.intialized = false;
  }

  // Subclass fill in the actual logic
  protected abstract onInit(): Promise<void>;
  protected abstract onExecute(context: PluginContext) : Promise<PluginResult>;
  protected onDestroy(): Promise<void> { 
    return Promise.resolve();
  }
}


class LogginPlugin extends BasePlugin {
  readonly name = "logging";
  readonly version: string = "1.0.0"

  protected async onInit(): Promise<void> {
    console.log("logger Started")
  }

  protected async onExecute(context: PluginContext): Promise<PluginResult> {
    console.log(`${this.name}`, context.data);
    return {success: true}
  }
}


class ExternalAnalyticsPlugin extends Plugin {
  readonly name: string = "logging";
  readonly version: string = "2.0.0";
  
  async intialize(config: PluginConfig): Promise<void> {
    
  }

  async execute(context: PluginContext): Promise<PluginResult> {
    
  }

  async destroy(): Promise<void> {
    
  }
}


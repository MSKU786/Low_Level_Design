/*
 Design from scratch - Cloud IDE workspace system

40 pts 20 min

Use the 5-step decomposition. Identify which creational pattern fits each requirement. Produce interfaces, class names, and composition root.

Requirements:

1. Workspace templates: The IDE offers pre-configured workspaces: "React Starter" (Node.js runtime + npm + ESLint + Prettier + React boilerplate), "Python ML" (Python runtime + pip + Jupyter + TensorFlow boilerplate), "Java API" (JVM runtime + Maven + Spring Boot boilerplate). Users pick a template and get their own independent workspace to customize. New templates added monthly.

2. Runtime environments: Each workspace needs a matched set of tools: a runtime (Node/Python/JVM), a package manager (npm/pip/Maven), a linter (ESLint/Pylint/Checkstyle), and a debugger (Node debugger/pdb/JDB). These must come from the same ecosystem - you can't use npm with a Python runtime.

3. Workspace configuration: A workspace has: name (required), template (required), runtime settings (CPU cores, memory, disk), environment variables (0-20 key-value pairs), installed extensions (0-50), port forwarding rules (0-10), and git 
configuration (optional). Constructor would be unmanageable.

4. Extension installation: Extensions are created based on a type string from a marketplace: "linter", "formatter", "theme", "git-tool", "ai-assistant". Each has different setup logic. New extension types appear frequently.

5. IDE configuration: Font size, theme (dark/light), keybindings, telemetry opt-in-loaded once at startup from user preferences. All workspace services share this config.

Deliverables:

1. For each requirement (1-5), name the creational pattern and one sentence why
2. All key interfaces
3. Class names for concrete implementations
4. The WorkspaceBuilder fluent API (method signatures only)
5. Show how a user picks "React Starter" template, customizes it, and builds
6. Composition root wiring the registries, factories, and singleton

*/


interface RuntimeEnvironmentFactory {
  createRuntime(): Runtime;
  createPackageManager(): PackageManager;
  createLinter(): Linter;
  createDebugger(): Debugger;
}

interface Runtime {}

interface PackageManager {}

interface Linter {}

interface Debugger {}

class NodeRuntime implements Runtime {}

class NodePackageManager implements PackageManager {}

class ESLint implements Linter {}

class NodeDebugger implements Debugger {}

class PythonRuntime implements Runtime {}

class PythonPackageManager implements PackageManager {}

class Pylint implements Linter {}

class PDBDebugger implements Debugger {}

class JVMRuntime implements Runtime {}

class MavenPackageManager implements PackageManager {}

class Checkstyle implements Linter {}

class JDBDebugger implements Debugger {}

class NodeRuntimeEnvironment implements RuntimeEnvironmentFactory {
  createRuntime(): NodeRuntime {
    return new NodeRuntime();
  }

  createDebugger(): NodeDebugger {
    return new NodeDebugger();
  }

  createLinter(): ESLint {
    return new ESLint();
  }

  createPackageManager(): PackageManager {
    return new NodePackageManager();
  }
}

class PythonRuntimeEnvironment implements RuntimeEnvironmentFactory {
  createRuntime(): PythonRuntime {
    return new PythonRuntime();
  }

  createDebugger(): PDBDebugger {
    return new PDBDebugger();
  }

  createLinter(): Pylint {
    return new Pylint();
  }

  createPackageManager(): PythonPackageManager {
    return new PythonPackageManager();
  }
}

class JavaRuntimeEnvironment implements RuntimeEnvironmentFactory {
  createRuntime(): JVMRuntime {
    return new JVMRuntime();
  }

  createDebugger(): JDBDebugger {
    return new JDBDebugger();
  }

  createLinter(): Checkstyle {
    return new Checkstyle();
  }

  createPackageManager(): MavenPackageManager {
    return new MavenPackageManager();
  }
}

class RuntimeEnvRegistry {
  private runtimesMap = new Map<string, RuntimeEnvironmentFactory>();

  register(env: string, runtime: RuntimeEnvironmentFactory) {
    this.runtimesMap.set(env, runtime);
  }

  get(env: string): RuntimeEnvironmentFactory {
    const runtime = this.runtimesMap.get(env);

    if (!runtime) {
      throw new Error(`Unknow factory type ${env}`);
    }

    return runtime;
  }
}


interface ExtensionFactory {
  installExtension(): Promise<void>;
}

class ThemeFactory implements ExtensionFactory {
  installExtension(): Promise<void> {
    return Promise.resolve();
  }
}

class FormatterFactory implements ExtensionFactory {
  installExtension(): Promise<void> {
    return Promise.resolve();
  }
}


class ExtensionRegistry {
  private extensionMap = new Map<string, ExtensionFactory>();

  register(name: string, factory: ExtensionFactory) {
    this.extensionMap.set(name, factory);
  }

  create(name: string, id: string): ExtensionFactory {
    const factory = this.extensionMap.get(name):

    if (!factory) 
      throw new Error(`Unknow factory extension ${name}`)
  
    return factory;
  }
}



interface IIDEConfig {
  fontSize: number; 
  theme: string; 
  keybindings: string;
  telemetry: boolean;
}

class IDEConfig implements IIDEConfig {
  private static instance:  IDEConfig | null = null;

  fontSize: number = 14;
  theme = "dark"; 
  keybindings: string = "defualt";
  telemetry: boolean = false;

  private constructor() {}

  static getInstance(): IDEConfig {
    if (!IDEConfig.instance) {
      IDEConfig.instance = new IDEConfig();
    }

    return IDEConfig.instance;
  }
}


interface Clonable<T> {
  clone(): T;
}

class WorkSpaceTemplate implements Clonable<WorkSpaceTemplate> {
  constructor(
    public readonly name: string,
    public readonly runtimeEnvironment: string,
    public extension: string[],
    public runTimeSetting: RuntimeSettings,
  ) {}

  clone(): WorkSpaceTemplate {
    return new WorkSpaceTemplate(
      this.name,
      this.runtimeEnvironment,
      [...this.extension],
      { ...this.runTimeSetting },
    );
  }
}


class TemplateRegistry {
  private templates = new Map<string, WorkSpaceTemplate>();

  register(name: string, template: WorkSpaceTemplate) : Void {
    this.templates.set(name, template);
  }

  get(name: string): WorkSpaceTemplate {
    const template = this.templates.get(name);
    if (!template) throw new Error(`Unknown Template: ${name}`)
    return template.clone();  
  }
}


class WorkspaceBuilder {
  private _name: string;
  private _templateName: string = "custom";
  private _ecoSystem? : string;
  private _extensionIds: {type: string; id: string}[] = [];
  private _resources: RuntimeSettings = {
    cpuCores: 2,
    memory: 4,
    disk: 2
  } ;
  private _envVars: Record<string, string> = {};
  private _gitConfig : {repo?: string; branch?: string} = {}
  private _portForwarding: {port: number; label: string}[] = [];
  private extensionRegistry: ExtensionRegistry;
  private ideConfig: IIDEConfig;
  private runtimeEnvironmentRegistry: RuntimeEnvRegistry

  constructor(runtimeEnvRegistrY: RuntimeEnvRegistry, 
    extensionRegistry: ExtensionRegistry,
    ideCOnfig: IIDEConfig) {
      this.runtimeEnvironmentRegistry  = runtimeEnvRegistrY;
      this.extensionRegistry = extensionRegistry;
      this.ideConfig = ideCOnfig;
    }

  
  static fromTemplate(
    template: WorkSpaceTemplate,
    runtimeEnvs: RuntimeEnvRegistry,
    extensionRegistry: ExtensionRegistry,
    ideConfig: IIDEConfig
  ) {
    const builder = new WorkspaceBuilder(runtimeEnvs, extensionRegistry, ideConfig)
    builder._templateName = template.name;
    builder._ecoSystem = template.runtimeEnvironment
    builder._resources = {...template.runTimeSetting}

    for (const extId of template.extension) {
      builder._extensionIds.push({
        type: "linter",
        id: extId
      })
    }

    return builder;
  }

  setName(name: string) : this {
    this._name = name;
    return this;
  }
  
  setEcosytem(ecosystem: string): this {
    this._ecoSystem = ecosystem;
    return this;
  }

  setRuntimeSettings(): WorkspaceBuilder {
    return this;
  }

  setEnvironmentVariables(): WorkspaceBuilder {
    return this;
  }

  setInstalledExtension(): WorkspaceBuilder {
    return this;
  }

  setPortForwardingRules(): WorkspaceBuilder {
    return this;
  }

  setGitConfiguration(): WorkspaceBuilder {
    return this;
  }

  build(): WorkSpace {
    if (!this._name) {
      throw new Error("Workspace name is required. Call .setName()")
    }

    if (!this._ecoSystem) {
      throw new Error("Ecosystem is required. Call .setEcosystem() or use from TEmplate()")
    }

    const runtimeEnvironment = this.runtimeEnvironmentRegistry.get(this._ecoSystem);
    const runtime = runtimeEnvironment.createRuntime();
    const packageManager = runtimeEnvironment.createPackageManager();
    const linter = runtimeEnvironment.createLinter();
    const debbugger = runtimeEnvironment.createDebugger();

    const extensions: ExtensionFactory[]= [];
    for (const ext of this._extensionIds) {
      try {
        const extension= this.extensionRegistry.create(ext.type);
        extensions.push(extension);
      } catch{
        throw new Error();
      }
    }

    return new WorkSpaceTemplate(
      this._name,
      this_templateName,
      runtime,
      packageManager,
      linter,
      debbugger,
      extensions,
      {...this._resources},
      {...this._envVars},
      {...this._gitConfig},
      this.ideConfig
    )


  }
}

interface RuntimeSettings {
  cpuCores?: number;
  memory?: number;
  disk?: number;
}
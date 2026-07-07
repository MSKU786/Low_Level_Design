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

interface WorkspaceTemplate {
  cloen(): Workspace;
}
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

interface RuntimeSettings {
  cpuCores: number;
  memory: string;
  disk: string;
}

class WorkspaceBuilder {
  private readonly _name: string;
  private readonly _template: WorkspaceTemplate;
  private readonly runTimeSetting: RuntimeSettings;
  private readonly environmentVariables: Record<string, string>[];
  private readonly installedExtension: string[];
  private readonly portForwardingRules: string[];
  private readonly gitConfiguration: string[];

  constructor(name, template) {}

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

  build(): WorkSpace {}
}

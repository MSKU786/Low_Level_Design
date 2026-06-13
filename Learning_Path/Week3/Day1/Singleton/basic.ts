// Basic Singleton

class Logger {
  private static instance: Logger | null = null;
  private logs: string[] = [];

  // Private constructor
  private constructor() {}

  // the only way to get the instance
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const entry = `[${new Date().toISOString()}] ${message}}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs(): readonly string[] {
    return [...this.logs];
  }
}

// USage

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log(logger1 == logger2);

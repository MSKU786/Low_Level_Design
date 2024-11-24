// Log Levels Enum
enum LogLevel {
  INFO,
  DEBUG,
  ERROR,
}

// Log Request Class
class LogRequest {
  private level: LogLevel;
  private message: string;

  constructor(level: LogLevel, message: string) {
    this.level = level;
    this.message = message;
  }

  getLevel(): LogLevel {
    return this.level;
  }

  getMessage(): string {
    return this.message;
  }
}

// Logger Interface
interface Logger {
  setNextLogger(nextLogger: Logger): void;
  log(request: LogRequest): void;
}

// Abstract Logger (Base Class)
abstract class AbstractLogger implements Logger {
  protected nextLogger: Logger | null = null;

  setNextLogger(nextLogger: Logger): void {
    this.nextLogger = nextLogger;
  }

  log(request: LogRequest): void {
    if (this.canLog(request)) {
      this.write(request.getMessage());
    } else if (this.nextLogger) {
      this.nextLogger.log(request);
    }
  }

  protected abstract canLog(request: LogRequest): boolean;

  protected abstract write(message: string): void;
}

// Concrete Loggers
class InfoLogger extends AbstractLogger {
  protected canLog(request: LogRequest): boolean {
    return request.getLevel() === LogLevel.INFO;
  }

  protected write(message: string): void {
    console.log(`INFO: ${message}`);
  }
}

class DebugLogger extends AbstractLogger {
  protected canLog(request: LogRequest): boolean {
    return request.getLevel() === LogLevel.DEBUG;
  }

  protected write(message: string): void {
    console.log(`DEBUG: ${message}`);
  }
}

class ErrorLogger extends AbstractLogger {
  protected canLog(request: LogRequest): boolean {
    return request.getLevel() === LogLevel.ERROR;
  }

  protected write(message: string): void {
    console.error(`ERROR: ${message}`);
  }
}

// Main Class Simulation
function main(): void {
  // Create loggers
  const infoLogger = new InfoLogger();
  const debugLogger = new DebugLogger();
  const errorLogger = new ErrorLogger();

  // Set chain of responsibility
  infoLogger.setNextLogger(debugLogger);
  debugLogger.setNextLogger(errorLogger);

  // Create log requests
  const log1 = new LogRequest(LogLevel.INFO, "This is an informational message.");
  const log2 = new LogRequest(LogLevel.DEBUG, "This is a debug-level message.");
  const log3 = new LogRequest(LogLevel.ERROR, "This is an error message.");

  // Start logging chain
  infoLogger.log(log1); // INFO: This is an informational message.
  infoLogger.log(log2); // DEBUG: This is a debug-level message.
  infoLogger.log(log3); // ERROR: This is an error message.
}

main();

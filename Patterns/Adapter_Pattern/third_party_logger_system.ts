// Expected interface within our applicate

interface Logger {
  logInfo(message: string): void;
  logError(message: string): void;
}

// Exisiting logging system

class LegacyLogger implements Logger {
  logInfo(message: string): void {
    console.log(`-- INFO --: ${message}`);
  }

  logError(message: string): void {
    console.log(`-- Error --: ${message}`);
  }
}

// Creating an Adapter

class LoggerAdapter implements Logger {
  private thirdPartyLogger: ThirdPartyLogger;

  constructor(thirdPartyLogger: ThirdPartyLogger) {
    this.thirdPartyLogger = thirdPartyLogger;
  }
  logInfo(message: string): void {
    this.thirdPartyLogger.log('-- info --', `${message}`);
  }

  logError(message: string): void {
    this.thirdPartyLogger.log('-- error --', `${message}`);
  }
}

// ThirdParty Logger
// New Third-Party Logger (Incompatible with Logger Interface)
class ThirdPartyLogger {
  log(level: string, message: string): void {
    console.log(`[${level.toUpperCase()}]: ${message}`);
  }
}

// Using the old logger
const oldLogger: Logger = new LegacyLogger();
oldLogger.logInfo('Starting application...');
oldLogger.logError('Failed to connect to database');

// Using the new logger with an adapter
const thirdPartyLogger = new ThirdPartyLogger();
const adaptedLogger: Logger = new LoggerAdapter(thirdPartyLogger);

adaptedLogger.logInfo('Starting application with new logger...');
adaptedLogger.logError('Failed to connect to API');

interface ILogger {
  log(message: string): void;
  getLogs(): readonly string[];
}

// Step2: Single implemnts the interface

class AppLogger implements ILogger {
  private static instance: AppLogger | null = null;
  private logs: string[] = [];
  private constructor() {}

  static getInstance() {
    if (!AppLogger.instance) AppLogger.instance = new AppLogger();
    return AppLogger.instance;
  }

  log(msg: string) {
    this.logs.push(msg);
    console.log(msg);
  }

  getLogs(): readonly string[] {
    return [...this.logs];
  }

  static resetForTesting(): void {
    AppLogger.instance = null;
  }
}

class OrderService {
  constructor(private logger: ILogger) {}
}

const service = new OrderService(AppLogger.getInstance());

const fakeLogs: string[] = [];

const fakeLogger: ILogger = {
  log(msg) {
    fakeLogs.push(msg);
  },
  getLogs() {
    return fakeLogs;
  },
};

const testService = new OrderService(fakeLogger);

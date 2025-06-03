interface LoggerInterface {
  log(message: string): void;
}

class RealLogger implements LoggerInterface {
  log(message: string): void {
    console.log(message);
  }
}

class NullLogger implements LoggerInterface {
  // Does nothing, silently ignoring the log request
  log(message: string): void {}
}

class UserService {
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface = new NullLogger()) {
    this.logger = logger;
  }

  public createUser(): void {
    this.logger.log('User created'); // No null check needed
    // Create user logic
  }
}

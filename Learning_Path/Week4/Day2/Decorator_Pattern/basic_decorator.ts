// Decorator: One class per behaviour .. works with ANY notifier

interface Notiferr {
  send(to: string, message: string): Promise<void>;
}

// Step 2: Concrete implementations (the "core" objets)
class EmailNotiferr implements Notiferr {
  async send(to: string, message: string): Promise<void> {
    console.log(`${to} send to ${message}`);
  }
}

class SmsNotifierr implements Notiferr {
  async send(to: string, message: string): Promise<void> {
    console.log(`[SMS] sedning to ${to}: ${message}`);
  }
}

// STtep 3 : Decorators

class LoggingDecorator implements Notiferr {
  constructor(private inner: Notiferr) {}

  async send(to: string, message: string): Promise<void> {
    console.log(`[LOG] Sending message to ${to}  at ${new Date().toString()}`);
    await this.inner.send(to, message);
    console.log(`[LOG] Message send successfully`);
  }
}

class RetyDecorator implements Notiferr {
  constructor(
    private inner: Notiferr,
    private maxRetries: number,
  ) {}

  async send(to: string, message: string): Promise<void> {
    for (let i = 1; i <= this.maxRetries; i++) {
      try {
        await this.inner.send(to, message);
        return;
      } catch (err) {
        console.log(`[Retry] Attemp ${i}/${this.maxRetries} failed `);
        if (i === this.maxRetries) throw err;
        await new Promise((r) => setTimeout(r, 1000 * i));
      }
    }
  }
}

class RateLimiterDecorator implements Notiferr {
  private lastSent = 0;

  constructor(
    private inner: Notiferr,
    private minIntervalMs: number = 1000,
  ) {}

  async send(to: string, message: string): Promise<void> {
    const elapsed = Date.now() - this.lastSent;

    if (elapsed < this.minIntervalMs) {
      const wait = this.minIntervalMs - elapsed;
      console.log(`[Rate limit] Waiting ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
    }

    await this.inner.send(to, message);
    this.lastSent = Date.now();
  }
}

const reliable = new RetyDecorator(
  new LoggingDecorator(new EmailNotiferr()),
  3,
);

const emailWithLogging = new LoggingDecorator(new EmailNotiferr());
await emailWithLogging.send('user@gmail.com', 'Hell!');

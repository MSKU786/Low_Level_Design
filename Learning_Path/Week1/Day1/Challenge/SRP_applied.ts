import crypto from 'crypto';

interface IValidator {
  validate(name: string, email: string, password: string): void;
}

interface IPasswordHasher {
  hashPassword(password: string): { hash: string; salt: string };
}

interface IUserRepository {
  save(name: string, email: string, hash: string, salt: string): Promise<void>;
}

interface INotifier {
  sendEmail(email: string): Promise<void>;
}

interface IAnalytics {
  logAnalyticsEvent(userId: string, email: string): Promise<void>;
}

class UserValidator implements IValidator {
  validate(name: string, email: string, password: string) {
    if (name.length < 2) throw new Error('Name too short');

    if (!email.includes('@')) throw new Error('Invalid email');

    if (password.length < 8) throw new Error('Password too weak');

    if (!/[A-Z]/.test(password)) throw new Error('Need uppercase');

    if (!/[0-9]/.test(password)) throw new Error('Need a number');
  }
}

class HashPassword implements IPasswordHasher {
  hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return { hash, salt };
  }
}

class UserDBRepository implements IUserRepository {
  async save(
    name: string,
    email: string,
    hash: string,
    salt: string,
  ): Promise<User> {
    return await db.query(
      `INSERT INTO users (name, email, password_hash, salt, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [name, email, hash, salt],
    );
  }
}

class UserNotifier implements INotifier {
  async sendEmail(email: string): Promise<void> {
    // Send welcome email
    await fetch('https://api.mailgun.net/v3/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILGUN_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Welcome!',
        html: `<h1>Hi ${name}</h1><p>Thanks for signing up!</p>`,
      }),
    });
  }
}

class LogEvent implements IAnalytics {
  async logAnalyticsEvent(event: string, userId: string) {
    // Log analytics event
    await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'user_registered',
        properties: {
          userId,
          timestamp: Date.now(),
        },
      }),
    });
  }
}

class UserService {
  constructor(
    private validator: IValidator,
    private hasher: IPasswordHasher,
    private repo: IUserRepository,
    private notifier: INotifier,
    private analytics: IAnalytics,
  ) {}

  async registerUser(name: string, email: string, password: string) {
    this.validator.validate(name, email, password);
    const { hash, salt } = await this.hasher.hashPassword(password);
    const user = await this.repo.save(name, email, hash, salt);
    await this.notifier.sendEmail(email);
    await this.analytics.logAnalyticsEvent('user registerd', {
      userId: user.id,
    });
    return user;
  }
}

const service = new UserService(
  new UserValidator(),
  new HashPassword(),
  new UserDBRepository(),
  new UserNotifier(),
  new LogEvent(),
);

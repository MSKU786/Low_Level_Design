import crypto from 'crypto';

class UserService {
  async registerUser(name: string, email: string, password: string) {
    // Validation
    if (name.length < 2) throw new Error('Name too short');

    if (!email.includes('@')) throw new Error('Invalid email');

    if (password.length < 8) throw new Error('Password too weak');

    if (!/[A-Z]/.test(password)) throw new Error('Need uppercase');

    if (!/[0-9]/.test(password)) throw new Error('Need a number');

    // Password hashing
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    // Save to DB
    const result = await db.query(
      `INSERT INTO users (name, email, password_hash, salt, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [name, email, hash, salt],
    );

    const user = result.rows[0];

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

    // Log analytics event
    await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'user_registered',
        properties: {
          userId: user.id,
          email,
          timestamp: Date.now(),
        },
      }),
    });

    return user;
  }
}

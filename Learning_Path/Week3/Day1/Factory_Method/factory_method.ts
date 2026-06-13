abstract class NotificationSender {
  async send(recipient: string, message: string) {
    const channel = this.createChannel();
    const formatted = this.format(message);
    await channel.delivery(recipient, formatted);
  }

  // Factory method
  protected abstract createChannel(): NotificationChannel;

  // SHared logic
  protected format(message: string): string {
    return `[${new Date().toISOString()}] ${message}`;
  }
}

interface NotificationChannel {
  deliver(recipient: string, message: string): Promise<void>;
}

// Each subclass will create its own channel taype
class EmailSender extends NotificationSender {
  protected createChannel(): NotificationChannel {
    return new EmailChannel(process.env.SG_KEY);
  }
}

class SMSSender extends NotificationSender {
  protected createChannel(): NotificationChannel {
    return new SMSChannel(process.env.TWILIO_KEY);
  }
}

class SlackSender extends NotificationSender {
  protected createChannel(): NotificationChannel {
    return new SlackChannel(process.env.SLACK_WEBHOOK);
  }
}

// Bridget - split "what" form "how" connect by composition

interface MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void>;
}

class EmailChannel implements MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void> {
    console.log(`Email to ${to}: [${subject} ${body}]`);
    return Promise.resolve();
  }
}

class SMSChannel implements MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void> {
    console.log(`SMS to ${to}: [${subject} ${body}]`);
    return Promise.resolve();
  }
}

class SlackChannel implements MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void> {
    console.log(`Slack to ${to}: ${body}]`);
    return Promise.resolve();
  }
}

abstract class Message {
  constructor(protected channel: MessageChannel2) {}

  abstract send(to: string, content: string): Promise<void>;
}

class RegularMessage extends Message {
  async send(to: string, content: string): Promise<void> {
    await this.channel.send(to, 'Info', content);
  }
}

class UrgentMessage extends Message {
  async send(to: string, content: string): Promise<void> {
    const fromatted = `URGENT: ${content}`;
    await this.channel.send(to, 'URGETN', fromatted);
  }
}

class CriticalMessage extends Message {
  async send(to: string, content: string): Promise<void> {
    const formatted = `CRITICAL: ${content.toUpperCase()}`;
    await this.channel.send(to, 'CRITICAL ALERT', formatted);
    await this.channel.send(to, 'RE: CRITICAL', 'please acknowledge reciept');
  }
}

const urgentEmail = new UrgentMessage(new EmailChannel());
const criticalSlack = new CriticalMessage(new SlackChannel());
const regularSMS = new RegularMessage(new SMSChannel());

await urgentEmail.send('user@email.com', 'Server load to 90%');
await criticalSlack.send('incidents', 'datebase is done');
await regularSMS.send('+91987654321', 'your order shipped');

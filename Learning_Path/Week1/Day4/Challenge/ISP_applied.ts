// ----------------------
// Core Capability Interfaces
// ----------------------

interface BasicNotification {
  send(userId: string, message: string): Promise<void>;
}

interface BulkNotification {
  sendBulk(userIds: string[], message: string): Promise<void>;
}

interface RichNotification {
  sendRichContent(
    userId: string,
    html: string,
    plainText: string
  ): Promise<void>;

  sendWithAttachment(
    userId: string,
    message: string,
    attachment: Buffer
  ): Promise<void>;
}

interface SchedulableNotification {
  schedule(
    userId: string,
    message: string,
    sendAt: Date
  ): Promise<void>;
}

// ----------------------
// Unique Capabilities
// ----------------------

interface SilentPushCapable {
  sendSilent(userId: string, payload: object): Promise<void>;
}

interface ChannelMessageCapable {
  sendToChannel(channelId: string, message: string): Promise<void>;
}

// ----------------------
// Implementations
// ----------------------

class EmailNotification
  implements
    BasicNotification,
    BulkNotification,
    RichNotification,
    SchedulableNotification
{
  async send(userId: string, message: string): Promise<void> {
    console.log("Email sent:", userId, message);
  }

  async sendBulk(userIds: string[], message: string): Promise<void> {
    console.log("Bulk email:", userIds, message);
  }

  async sendRichContent(
    userId: string,
    html: string,
    plainText: string
  ): Promise<void> {
    console.log("Email rich content:", userId);
  }

  async sendWithAttachment(
    userId: string,
    message: string,
    attachment: Buffer
  ): Promise<void> {
    console.log("Email with attachment:", userId);
  }

  async schedule(
    userId: string,
    message: string,
    sendAt: Date
  ): Promise<void> {
    console.log("Email scheduled:", userId, sendAt);
  }
}

class SMSNotification
  implements BasicNotification, BulkNotification, SchedulableNotification
{
  async send(userId: string, message: string): Promise<void> {
    console.log("SMS sent:", userId, message);
  }

  async sendBulk(userIds: string[], message: string): Promise<void> {
    console.log("Bulk SMS:", userIds);
  }

  async schedule(
    userId: string,
    message: string,
    sendAt: Date
  ): Promise<void> {
    console.log("SMS scheduled:", userId, sendAt);
  }
}

class PushNotification
  implements BasicNotification, BulkNotification, SilentPushCapable
{
  async send(userId: string, message: string): Promise<void> {
    console.log("Push sent:", userId, message);
  }

  async sendBulk(userIds: string[], message: string): Promise<void> {
    console.log("Bulk push:", userIds);
  }

  async sendSilent(userId: string, payload: object): Promise<void> {
    console.log("Silent push:", userId, payload);
  }
}

class SlackNotification
  implements BasicNotification, RichNotification, ChannelMessageCapable
{
  async send(userId: string, message: string): Promise<void> {
    console.log("Slack DM:", userId, message);
  }

  async sendRichContent(
    userId: string,
    html: string,
    plainText: string
  ): Promise<void> {
    console.log("Slack markdown:", userId);
  }

  async sendWithAttachment(
    userId: string,
    message: string,
    attachment: Buffer
  ): Promise<void> {
    console.log("Slack file upload:", userId);
  }

  async sendToChannel(
    channelId: string,
    message: string
  ): Promise<void> {
    console.log("Slack channel message:", channelId);
  }
}

// ----------------------
// Consumers (Use Cases)
// ----------------------

// Only needs basic send → depends on BasicNotification
function sendWelcomeMessage(
  service: BasicNotification,
  userId: string
) {
  service.send(userId, "Welcome aboard!");
}

// Only needs scheduling
function scheduleReminder(
  service: SchedulableNotification,
  userId: string,
  message: string,
  when: Date
) {
  service.schedule(userId, message, when);
}

// Only needs rich content
function sendMarketingEmail(
  service: RichNotification,
  userId: string
) {
  service.sendRichContent(
    userId,
    "<h1>Sale!</h1>",
    "Sale!"
  );
}

// Uses unique capability
function sendSilentUpdate(
  service: SilentPushCapable,
  userId: string
) {
  service.sendSilent(userId, { type: "refresh" });
}
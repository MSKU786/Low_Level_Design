// YOUR CHALLENGE: Apply ISP to this notification system
// Time: ~35 minutes

// This is the notification interface for a SaaS app.
// Different notification channels have very different
// capabilities, but they're all forced into one interface.

interface NotificationService {
  // Core sending
  send(userId: string, message: string): Promise<void>;

  sendBulk(userIds: string[], message: string): Promise<void>;

  // Rich content
  sendWithAttachment(
    userId: string,
    message: string,
    attachment: Buffer
  ): Promise<void>;

  sendRichContent(
    userId: string,
    html: string,
    plainText: string
  ): Promise<void>;

  // Scheduling
  schedule(
    userId: string,
    message: string,
    sendAt: Date
  ): Promise<void>;
}

class EmailNotification implements NotificationService {
  // Email can do everything... this one is fine.
  // But should every consumer get access to all of it?
}

class SMSNotification implements NotificationService {
  // SMS can send, send bulk, and schedule.

  // It CANNOT: attach files, send HTML, use templates,
  // or provide read receipts.

  // What do you do with those methods?
}

class PushNotification implements NotificationService {
  // Push can send and send bulk.

  // It has delivery status but NOT read receipts.

  // It CANNOT: attach files, schedule, cancel, or use templates.

  // It has its OWN unique capability: send silent/background push.
  // Where does that go?
}

class SlackNotification implements NotificationService {
  // Slack can send, send rich content (markdown), and use templates.

  // It CANNOT: send bulk, attach files, schedule, or track delivery.

  // It has its OWN unique capability: send to a channel vs DM.
  // Where does that go?
}

// This function just needs to send a message
// But it's forced to accept the full NotificationService
function sendWelcomeMessage(
  service: NotificationService,
  userId: string
) {
  service.send(userId, "Welcome aboard!");
}

// This function needs scheduling
function scheduleReminder(
  service: NotificationService,
  userId: string,
  message: string,
  when: Date
) {
  service.schedule(userId, message, when);
}
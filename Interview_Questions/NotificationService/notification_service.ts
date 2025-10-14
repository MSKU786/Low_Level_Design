// Notification Interface

interface INotification {
  getContent(): string;
}

class SimpleNotification implements INotification {
  constructor(private text: string) {}

  getContent(): string {
    return this.text;
  }
}

// Observer Pattern

interface Observable {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObserver(): void;
}

class NotificationObservable implements Observable {
  private observers: Observer[] = [];
  private currentNotification: INotification | null = null;

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o != observer);
  }

  notifyObserver(): void {
    for (const obs of this.observers) {
      obs.update();
    }
  }

  setNotication(notification: INotification) {
    this.currentNotification = notification
    this.notifyObserver();
  }

  getNotification(): INotification | null {
    return this.currentNotification;
  }

  getNotificationContent(): string | null {
    if (this.currentNotification) {
      return this.currentNotification.getContent();
    }

    return null;
  }
}

interface Observer {
  update(): void;
}

// Strategy Pattern

interface INotificationStrategy {
  sendNotification(content: string|null): void
}


class SMSNotifcationStrategy implements INotificationStrategy {
  constructor(private phoneNumber: string) {

  }
  sendNotification(content: string|null): void {
    console.log(`SMS notification to ${this.phoneNumber} with content ${content}`)
  }
}


class EmailNotifcationStrategy implements INotificationStrategy {
  constructor(private emailId: string) {

  }
  sendNotification(content: string|null): void {
    console.log(`Email notification to ${this.emailId} with content ${content}`)
  }
}

class NotificationEngine implements Observer {

  constructor(private observable: NotificationObservable) {
    observable.addObserver(this)
  }

  private strategies: INotificationStrategy[]: []

  addStrategy(strategy: INotificationStrategy): void {
    this.strategies.push(strategy);
  }

  update() {
    const content = this.observable.getNotificationContent();
    for (const strategy of this.strategies) {
      strategy.sendNotification(content);
    }
  }
}


class NotificationService {
  private static instance: NotificationService
  private observable: NotificationObservable

  private constructor() {
    this.observable = new NotificationObservable;
  }


  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }
  
  getObservable(): NotificationObservable {
    return this.observable
  }

  sendNotification(notification: INotification): void {
    this.observable.setNotication(notification);
  }
}


// Demo
const service = NotificationService.getInstance();
const observable = service.getObservable();

const logger = new Logger(observable);
const engine = new NotificationEngine(observable);

engine.addStrategy(new EmailStrategy("random.person@gmail.com"));
engine.addStrategy(new SMSStrategy("+91 9876543210"));
engine.addStrategy(new PopUpStrategy());

let notification: INotification = new SimpleNotification("Your order has been shipped!");
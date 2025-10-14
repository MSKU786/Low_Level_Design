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
  private observers: IObserver[] = [];
  private currentNotification: INotification | null = null;
}

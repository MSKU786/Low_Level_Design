/*

Purpose: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.
Use Case: Implementing event listeners or real-time notifications.

*/

// Observer interface
interface Observer {
  update(message: string): void;
}

class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(message: string): void {
    console.log(`${this.name} received message: ${message}`);
  }
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(message: string): void {
    // Notify observers
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

const subject = new Subject();
const observer1 = new ConcreteObserver('Observer1');
const observer2 = new ConcreteObserver('Observer2');

subject.attach(observer1);
subject.attach(observer2);

subject.notify('Hello Observers!');

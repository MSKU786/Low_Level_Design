/*

Purpose: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.
Use Case: Implementing event listeners or real-time notifications.

*/

// Obs interface
interface Obs {
  update(message: string): void;
}

class ConcreteObs implements Obs {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(message: string): void {
    console.log(`${this.name} received message: ${message}`);
  }
}

class Sub {
  private observers: Obs[] = [];

  attach(observer: Obs): void {
    this.observers.push(observer);
  }

  notify(message: string): void {
    // Notify observers
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

const subject = new Sub();
const observer1 = new ConcreteObs('Obs1');
const observer2 = new ConcreteObs('Obs2');

subject.attach(observer1);
subject.attach(observer2);

subject.notify('Hello Obss!');

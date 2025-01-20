interface subject {
  registerObserver(o: observer): void;
  removeObserver(o: observer): void;
  notifyObserver(): void;
}

interface observer {
  update(temp: number, humidity: number, pressure: number): void;
}

interface display {
  display(): void;
}

class WeatherData implements subject {
  private observers: observer[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }

  registerObserver(o: observer): void {
    this.observers.push(o);
  }

  removeObserver(o: observer): void {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  notifyObserver(): void {
    this.observers.forEach((observer) =>
      observer.update(this.temperature, this.humidity, this.pressure)
    );
  }

  measurementsChanged(): void {
    this.notifyObserver();
  }

  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsChanged();
  }
}

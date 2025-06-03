interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void;
}

interface Observer {
  update(): void;
}

interface Display {
  display(): void;
}

class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => observer.update());
  }

  measurementsChanged(): void {
    this.notifyObservers();
  }

  getPressure(): number {
    return this.pressure;
  }

  getTemprature(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
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

class CurrentConditionDisplay implements Observer, Display {
  private temperature: number;
  private humidity: number;
  private pressure: number;
  private weatherData: WeatherData;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update(): void {
    this.temperature = this.weatherData.getTemprature();
    this.humidity = this.weatherData.getHumidity();
    this.pressure = this.weatherData.getPressure();
    this.display();
  }

  display(): void {
    console.log(
      `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity and ${this.pressure} pressure`
    );
  }
}

class WeatherStation {
  constructor() {
    const weatherData = new WeatherData();
    const currentConditionDisplay = new CurrentConditionDisplay(weatherData);

    weatherData.setMeasurements(80, 65, 30.4);
    weatherData.setMeasurements(82, 70, 29.2);
    weatherData.setMeasurements(78, 90, 29.2);
  }
}

new WeatherStation();

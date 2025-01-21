var WeatherData = /** @class */ (function () {
    function WeatherData() {
        this.observers = [];
    }
    WeatherData.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherData.prototype.removeObserver = function (o) {
        this.observers = this.observers.filter(function (observer) { return observer !== o; });
    };
    WeatherData.prototype.notifyObservers = function () {
        var _this = this;
        this.observers.forEach(function (observer) {
            return observer.update(_this.temperature, _this.humidity, _this.pressure);
        });
    };
    WeatherData.prototype.measurementsChanged = function () {
        this.notifyObservers();
    };
    WeatherData.prototype.setMeasurements = function (temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.measurementsChanged();
    };
    return WeatherData;
}());
var CurrentConditionDisplay = /** @class */ (function () {
    function CurrentConditionDisplay(weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    CurrentConditionDisplay.prototype.update = function (temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.display();
    };
    CurrentConditionDisplay.prototype.display = function () {
        console.log("Current conditions: ".concat(this.temperature, "F degrees and ").concat(this.humidity, "% humidity and ").concat(this.pressure, " pressure"));
    };
    return CurrentConditionDisplay;
}());
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        var weatherData = new WeatherData();
        var currentConditionDisplay = new CurrentConditionDisplay(weatherData);
        weatherData.setMeasurements(80, 65, 30.4);
        weatherData.setMeasurements(82, 70, 29.2);
        weatherData.setMeasurements(78, 90, 29.2);
    }
    return WeatherStation;
}());
new WeatherStation();

interface WeatherService {
  getForecast(city: string): Promise<Forecast>;
  getAlerts(city: string): Promise<Alert[]>;
}

interface Forecast {
  temp: number;
  description: string;
}
interface Alert {
  severity: string;
  message: string;
}

class OpenWeatherService implements WeatherService {
  async getForecast(city: string): Promise<Forecast> {
    console.log(`Calling open weather API for ${city}`);
    const res = await fetch(`https://api.weather.com/${city}`);
    return res.json();
  }

  async getAlerts(city: string): Promise<Alert[]> {
    console.log('Calling openweather alerts api for ');
    const res = await fetch(`https://api.weather.com/${city}/alerts`);
    return res.json();
  }
}

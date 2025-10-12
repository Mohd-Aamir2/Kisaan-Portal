"use client";
import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloudy, CloudRain, Thermometer, Droplets,Cloud } from "lucide-react";
import { AppContext } from "@/app/context/appcontext";

// Define API response type (simplified)
interface WeatherData {
  currentTemperature: number;
  humidity: number;
  weatherCondition: string;
  forecast: { date: string; temperature: number; condition: string }[];
}

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Clear": <Sun className="w-5 h-5 text-yellow-500" />,
  "Clouds": <Cloudy className="w-5 h-5 text-gray-500" />,
  "Rain": <CloudRain className="w-5 h-5 text-blue-500" />,
};

export function WeatherWidget({ city = "Delhi" }: { city?: string }) {
   const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used inside AppContextProvider");

  const { state, district } = context;
  console.log(state,district);

  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map OpenWeather conditions → icons
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return CloudRain;
    if (condition.includes("Cloud")) return Cloud;
    if (condition.includes("Clear")) return Sun;
    return Sun;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        // ✅ Current weather
        const currentResp = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: `${district},IN`,
              units: "metric",
              appid: "939fc60059567bed0633ecb215e5b5b1", // replace with your key
            },
          }
        );

        const data = currentResp.data;
        setCurrentWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // m/s → km/h
          visibility: Math.round(data.visibility / 1000), // m → km
          uvIndex: 6, // need separate API, hardcode or ignore
          feelsLike: Math.round(data.main.feels_like),
          location: `${district}, ${state}, India`,
        });

        // ✅ Forecast (5-day / 3-hour API)
        const forecastResp = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: `${district},IN`,
              units: "metric",
              appid: "939fc60059567bed0633ecb215e5b5b1",
            },
          }
        );

        // Pick one forecast every 24h (8 * 3h = 24h)
        const daily = forecastResp.data.list.filter((_: any, idx: number) => idx % 8 === 0)
          .slice(0, 5) // 5 days only
          .map((item: any, index: number) => ({
            day: index === 0 
              ? "Today" 
              : new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
            icon: getWeatherIcon(item.weather[0].main),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            humidity: item.main.humidity,
            precipitation: Math.round(item.pop * 100), // %
          }));

        setForecast(daily);
      } catch (err) {
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (state && district) {
      fetchWeather();
    }
  }, [state, district]);


  if (loading) return <p>Loading weather data...</p>;
  if (!currentWeather) return <p>No weather data available.</p>;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Local Weather</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }
  return (
   <Card>
  <CardHeader>
    <CardTitle>Weather Forecast in {district}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-4">
      {/* Current */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
        <div>
          <p className="text-sm opacity-80">Now</p>
          <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
          <p className="text-sm capitalize">{currentWeather.condition}</p>
        </div>
        <div className="text-6xl opacity-90">
          {weatherIcons[currentWeather.condition] || (
            <Cloudy className="w-16 h-16 text-gray-200" />
          )}
        </div>
      </div>

      {/* Humidity */}
      <div className="flex items-center gap-4 text-sm px-2">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{currentWeather.humidity}% Humidity</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="space-y-2">
        <h4 className="font-semibold">5-Day Forecast</h4>
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden">
          {forecast.map((f, i) => (
            <div
              key={i}
              className={`flex justify-between items-center text-sm px-4 py-3 transition-colors
                ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} 
                hover:bg-blue-50`}
            >
              <p className="font-medium">{f.day}</p>
              <div className="flex items-center gap-2">
                {<f.icon className="w-5 h-5 text-blue-500" />}
                <p className="font-semibold text-gray-700">
                  {f.high}° / <span className="text-gray-500">{f.low}°</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CardContent>
</Card>

  );
}

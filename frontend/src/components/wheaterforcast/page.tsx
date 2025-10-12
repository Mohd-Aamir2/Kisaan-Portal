import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
} from "lucide-react";
import { AppContext } from "@/app/context/appcontext";

const WeatherForecast: React.FC = () => {
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

  return (
    <div className="space-y-6">
      {/* 🔹 Current Weather Card */}
      <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Sky and clouds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Current Weather Conditions</h2>
              <p className="text-blue-100 flex items-center space-x-2">
                <span>📍 Your farm location - {district},{state},India</span>
              </p>
              <p className="text-blue-200 text-sm mt-1">Last updated: just now</p>
            </div>
            <div className="text-center">
              <Sun className="w-20 h-20 text-yellow-300 mb-2" />
              <p className="text-blue-100 text-sm">{currentWeather.condition}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{currentWeather.temperature}°C</div>
              <p className="text-blue-100 text-sm">Temperature</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{currentWeather.humidity}%</div>
              <p className="text-blue-100 text-sm">Humidity</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{currentWeather.windSpeed} km/h</div>
              <p className="text-blue-100 text-sm">Wind Speed</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{currentWeather.feelsLike}°C</div>
              <p className="text-blue-100 text-sm">Feels Like</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Forecast & CropAdvice UI stays same */}
      {/* reuse your existing forecast + cropAdvice rendering below */}
      
      {/* Forecast */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">5-Day Weather Forecast</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <p className="font-semibold text-gray-800 mb-2">{day.day}</p>
              <day.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="space-y-1">
                <div className="flex justify-center space-x-2 text-sm">
                  <span className="font-semibold">{day.high}°</span>
                  <span className="text-gray-500">{day.low}°</span>
                </div>
                <p className="text-xs text-gray-600">{day.precipitation}% rain</p>
                <p className="text-xs text-gray-500">Humidity: {day.humidity}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crop Advisory (same UI as your code) */}
      {/* ... keep rest of your UI unchanged ... */}
    </div>
  );
};

export default WeatherForecast;

"use client";
import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloudy, CloudRain, Thermometer, Droplets, Cloud } from "lucide-react";
import { AppContext } from "@/app/context/appcontext";

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Clear": <Sun className="w-5 h-5 text-yellow-500" />,
  "Clouds": <Cloudy className="w-5 h-5 text-gray-500" />,
  "Rain": <CloudRain className="w-5 h-5 text-blue-500" />,
};

// 🔹 Fallback: state -> capital/major city (jab district geocode na ho paye)
const stateCapitalFallback: Record<string, string> = {
  "Andhra Pradesh": "Amaravati",
  "Arunachal Pradesh": "Itanagar",
  "Assam": "Guwahati",
  "Bihar": "Patna",
  "Chhattisgarh": "Raipur",
  "Goa": "Panaji",
  "Gujarat": "Gandhinagar",
  "Haryana": "Chandigarh",
  "Himachal Pradesh": "Shimla",
  "Jharkhand": "Ranchi",
  "Karnataka": "Bengaluru",
  "Kerala": "Thiruvananthapuram",
  "Madhya Pradesh": "Bhopal",
  "Maharashtra": "Mumbai",
  "Manipur": "Imphal",
  "Meghalaya": "Shillong",
  "Mizoram": "Aizawl",
  "Nagaland": "Kohima",
  "Odisha": "Bhubaneswar",
  "Punjab": "Chandigarh",
  "Rajasthan": "Jaipur",
  "Sikkim": "Gangtok",
  "Tamil Nadu": "Chennai",
  "Telangana": "Hyderabad",
  "Tripura": "Agartala",
  "Uttar Pradesh": "Lucknow",
  "Uttarakhand": "Dehradun",
  "West Bengal": "Kolkata",
};

export function WeatherWidget({ city = "Delhi" }: { city?: string }) {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used inside AppContextProvider");

  const { state, district } = context;

  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return CloudRain;
    if (condition.includes("Cloud")) return Cloud;
    if (condition.includes("Clear")) return Sun;
    return Sun;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!district || !state) return;

      const API_KEY = "939fc60059567bed0633ecb215e5b5b1"; // 🔹 apni actual key yahan daalo

      // 🔹 Multiple query variations try karo, jab tak koi match na mile
      const tryGeocode = async (query: string) => {
        try {
          const res = await axios.get(
            "https://api.openweathermap.org/geo/1.0/direct",
            { params: { q: query, limit: 1, appid: API_KEY } }
          );
          if (res.data && res.data.length > 0) {
            return { lat: res.data[0].lat, lon: res.data[0].lon, resolvedName: res.data[0].name };
          }
        } catch {
          // ignore, next variation try karenge
        }
        return null;
      };

      try {
        setLoading(true);
        setError(null);

        // 🔹 Query variations, priority order mein
        const capital = stateCapitalFallback[state];
        const queries = [
          `${district},${state},IN`,
          `${district},IN`,
          district,
          capital ? `${capital},${state},IN` : null,
          capital ? `${capital},IN` : null,
        ].filter(Boolean) as string[];

        let geo: { lat: number; lon: number; resolvedName: string } | null = null;
        for (const q of queries) {
          geo = await tryGeocode(q);
          if (geo) break;
        }

        if (!geo) {
          throw new Error(`Location not found for ${district}, ${state}`);
        }

        const { lat, lon, resolvedName } = geo;

        // ✅ Current weather (lat/lon se)
        const currentResp = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          { params: { lat, lon, units: "metric", appid: API_KEY } }
        );

        const data = currentResp.data;
        setCurrentWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          visibility: Math.round(data.visibility / 1000),
          uvIndex: 6,
          feelsLike: Math.round(data.main.feels_like),
          // 🔹 agar exact district resolve nahi hua, batao ki ye nearby/capital city ka data hai
          location:
            resolvedName.toLowerCase() === district.toLowerCase()
              ? `${district}, ${state}, India`
              : `${resolvedName} (near ${district}), ${state}, India`,
        });

        // ✅ Forecast
        const forecastResp = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          { params: { lat, lon, units: "metric", appid: API_KEY } }
        );

        const daily = forecastResp.data.list
          .filter((_: any, idx: number) => idx % 8 === 0)
          .slice(0, 5)
          .map((item: any, index: number) => ({
            day:
              index === 0
                ? "Today"
                : new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
            icon: getWeatherIcon(item.weather[0].main),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            humidity: item.main.humidity,
            precipitation: Math.round(item.pop * 100),
          }));

        setForecast(daily);
      } catch (err: any) {
        console.error("Weather fetch error:", err?.response?.data || err.message);
        setError("Could not load weather data for this location.");
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [state, district]);

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

  if (error || !currentWeather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Local Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            {error || "No weather data available."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast — {currentWeather.location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
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

          <div className="flex items-center gap-4 text-sm px-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{currentWeather.humidity}% Humidity</span>
            </div>
          </div>

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
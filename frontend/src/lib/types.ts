import {z} from 'zod';

export const WeatherSchema = z.object({
  currentTemperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity percentage.'),
  weatherCondition: z.string().describe('The current weather condition (e.g., sunny, rainy).'),
  temperatureForecast: z
    .array(z.object({temperature: z.number(), date: z.string()}))
    .describe('A list of temperature forecasts for the next few days.'),
});
export type Weather = z.infer<typeof WeatherSchema>;


export interface HistoricalOutcome {
  cropType: string;
  yield: number;
  fertilizerUsed: string;
}

export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  unit: string;
  change: number;
  location: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  link: string;
}

'use server';
/**
 * @fileoverview A tool for fetching real-time weather information.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {dummyWeather} from '@/lib/dummy-data';
import { WeatherSchema } from '@/lib/types';


export const getWeather = ai.defineTool(
    {
        name: 'getWeather',
        description: 'Returns the current weather and a 3-day forecast for a given location.',
        inputSchema: z.object({
            location: z.string().describe('The location to get the weather for.'),
        }),
        outputSchema: WeatherSchema,
    },
    async (input) => {
        // In a real app, this would call a weather API.
        // For this demo, we'll return dummy data.
        console.log(`Fetching weather for ${input.location}`);
        return dummyWeather;
    }
);

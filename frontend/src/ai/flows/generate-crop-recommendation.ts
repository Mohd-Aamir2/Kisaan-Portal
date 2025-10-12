// src/ai/flows/generate-crop-recommendation.ts
'use server';

/**
 * @fileOverview Generates crop recommendations for farmers based on weather and historical data.
 *
 * - generateCropRecommendation - A function that generates a crop recommendation.
 * - GenerateCropRecommendationInput - The input type for the generateCropRecommendation function.
 * - GenerateCropRecommendationOutput - The return type for the generateCropRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { WeatherSchema } from '@/lib/types';


const HistoricalOutcomeSchema = z.object({
  cropType: z.string().describe('The type of crop that was planted.'),
  yield: z.number().describe('The yield of the crop in kg/hectare.'),
  fertilizerUsed: z.string().describe('The type of fertilizer used.'),
});

const FarmProfileSchema = z.object({
  farmSize: z.number().describe('The size of the farm in hectares.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  location: z.string().describe('The location of the farm.'),
});

const GenerateCropRecommendationInputSchema = z.object({
  farmProfile: FarmProfileSchema.describe('The profile of the farm.'),
  weather: WeatherSchema.describe('The current and predicted weather conditions.'),
  historicalOutcomes: z
    .array(HistoricalOutcomeSchema)
    .describe('Historical outcomes from other farms with similar profiles.'),
  cropPreference: z.string().describe('The crop that the farmer prefers to grow.'),
});
export type GenerateCropRecommendationInput = z.infer<
  typeof GenerateCropRecommendationInputSchema
>;

const GenerateCropRecommendationOutputSchema = z.object({
  recommendedCrop: z.string().describe('The recommended crop to plant.'),
  fertilizerRecommendation: z.string().describe('The recommended fertilizer to use.'),
  irrigationSchedule: z.string().describe('The recommended irrigation schedule.'),
  pestControlTips: z.string().describe('Tips for controlling pests.'),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence in the recommendation (1 is highest)'
    ),
});
export type GenerateCropRecommendationOutput = z.infer<
  typeof GenerateCropRecommendationOutputSchema
>;

export async function generateCropRecommendation(
  input: GenerateCropRecommendationInput
): Promise<GenerateCropRecommendationOutput> {
  return generateCropRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropRecommendationPrompt',
  input: {schema: GenerateCropRecommendationInputSchema},
  output: {schema: GenerateCropRecommendationOutputSchema},
  prompt: `You are an AI crop recommendation engine. You will generate a crop recommendation based on the current and predicted weather, and historical outcomes from other farms with similar profiles.

Farm Profile:
Farm Size: {{{farmProfile.farmSize}}} hectares
Soil Type: {{{farmProfile.soilType}}}
Location: {{{farmProfile.location}}}

Weather:
Current Temperature: {{{weather.currentTemperature}}} Celsius
Humidity: {{{weather.humidity}}}%
Weather Condition: {{{weather.weatherCondition}}}
Temperature Forecast: {{#each weather.temperatureForecast}}{{{date}}}: {{{temperature}}} Celsius, {{/each}}

Historical Outcomes:
{{#each historicalOutcomes}}
Crop Type: {{{cropType}}}, Yield: {{{yield}}} kg/hectare, Fertilizer Used: {{{fertilizerUsed}}}
{{/each}}

Crop Preference: {{{cropPreference}}}

Based on this information, what crop do you recommend, what fertilizer should be used, what is the irrigation schedule, and what pest control tips do you have? Also, provide a confidence score between 0 and 1.

Make sure the output is in the specified JSON format.`,
});

const generateCropRecommendationFlow = ai.defineFlow(
  {
    name: 'generateCropRecommendationFlow',
    inputSchema: GenerateCropRecommendationInputSchema,
    outputSchema: GenerateCropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

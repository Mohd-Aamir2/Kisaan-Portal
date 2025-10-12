"use server";

import { generateCropRecommendation, type GenerateCropRecommendationOutput } from "@/ai/flows/generate-crop-recommendation";
import { dummyHistoricalOutcomes, dummyWeather } from "@/lib/dummy-data";

export async function getRecommendation(): Promise<GenerateCropRecommendationOutput> {
  // In a real application, you would fetch this data based on the logged-in user
  const input = {
    farmProfile: {
      farmSize: 50,
      soilType: "loamy",
      location: "Central Valley, California",
    },
    weather: dummyWeather,
    historicalOutcomes: dummyHistoricalOutcomes,
    cropPreference: "High-yield cash crop",
  };
  
  try {
    const recommendation = await generateCropRecommendation(input);
    return recommendation;
  } catch (error) {
    console.error("Error generating recommendation:", error);
    // You could return a more specific error object here
    throw new Error("Failed to generate recommendation.");
  }
}

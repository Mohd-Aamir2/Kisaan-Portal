"use server";

import { analyzeCropOutcomes, type CropOutcomeFeedback, type RecommendationImprovement } from "@/ai/flows/analyze-crop-outcomes";

export async function analyzeFeedback(feedback: CropOutcomeFeedback): Promise<RecommendationImprovement> {
  try {
    const improvement = await analyzeCropOutcomes(feedback);
    return improvement;
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    throw new Error("Failed to analyze feedback.");
  }
}

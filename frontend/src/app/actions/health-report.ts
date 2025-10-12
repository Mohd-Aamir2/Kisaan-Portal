"use server";

import { analyzeCropHealth, type AnalyzeCropHealthOutput } from "@/ai/flows/analyze-crop-health";

export async function getHealthReport(photoDataUri: string): Promise<AnalyzeCropHealthOutput> {
  try {
    const report = await analyzeCropHealth({ photoDataUri });
    return report;
  } catch (error) {
    console.error("Error analyzing crop health:", error);
    throw new Error("Failed to analyze crop health.");
  }
}

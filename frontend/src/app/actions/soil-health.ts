"use server";

import { analyzeSoilHealth, type AnalyzeSoilHealthOutput } from "@/ai/flows/analyze-soil-health";

export async function getSoilHealthReport(reportDataUri: string): Promise<AnalyzeSoilHealthOutput> {
  try {
    const report = await analyzeSoilHealth({ reportDataUri });
    return report;
  } catch (error) {
    console.error("Error analyzing soil health:", error);
    throw new Error("Failed to analyze soil health report.");
  }
}

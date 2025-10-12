// This is an AI-powered function to analyze crop outcomes and improve future recommendations.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const CropOutcomeFeedbackSchema = z.object({
    cropType: z.string().describe("Type of crop (e.g., corn, wheat, soy)."),
    fertilizerUsed: z.string().describe("Type of fertilizer used (e.g., Nitrogen, Phosphorus, Potassium)."),
    irrigationSchedule: z.string().describe("Irrigation schedule followed (e.g., daily, weekly)."),
    pestControlUsed: z.string().describe("Pest control methods used (e.g., pesticides, organic)."),
    yieldAmount: z.number().describe("Amount of yield (e.g., bushels, tons)."),
    weatherConditions: z.string().describe("Prevailing weather conditions during the crop cycle (e.g., sunny, rainy)."),
    soilType: z.string().describe("Type of soil (e.g., sandy, loamy, clay)."),
    farmerFeedback: z.string().describe("Farmer's feedback on the crop outcome."),
    location: z.string().describe("Geographic location of the farm."),
  }
);

export type CropOutcomeFeedback = z.infer<typeof CropOutcomeFeedbackSchema>;

const RecommendationImprovementSchema = z.object({
    improvedRecommendations: z.string().describe("Improved crop recommendations based on feedback."),
});

export type RecommendationImprovement = z.infer<typeof RecommendationImprovementSchema>;

export async function analyzeCropOutcomes(feedback: CropOutcomeFeedback): Promise<RecommendationImprovement> {
    return analyzeCropOutcomesFlow(feedback);
}

const analyzeCropOutcomesPrompt = ai.definePrompt({
    name: 'analyzeCropOutcomesPrompt',
    input: {schema: CropOutcomeFeedbackSchema},
    output: {schema: RecommendationImprovementSchema},
    prompt: `You are an expert agricultural advisor. Analyze the following crop outcome feedback from the farmer and provide improved recommendations for future crops.

Crop Type: {{{cropType}}}
Fertilizer Used: {{{fertilizerUsed}}}
Irrigation Schedule: {{{irrigationSchedule}}}
Pest Control Used: {{{pestControlUsed}}}
Yield Amount: {{{yieldAmount}}}
Weather Conditions: {{{weatherConditions}}}
Soil Type: {{{soilType}}}
Farmer Feedback: {{{farmerFeedback}}}
Location: {{{location}}}

Based on this information, provide improved recommendations:
`,
});

const analyzeCropOutcomesFlow = ai.defineFlow(
    {
        name: 'analyzeCropOutcomesFlow',
        inputSchema: CropOutcomeFeedbackSchema,
        outputSchema: RecommendationImprovementSchema,
    },
    async (feedback) => {
        const {output} = await analyzeCropOutcomesPrompt(feedback);
        return output!;
    }
);

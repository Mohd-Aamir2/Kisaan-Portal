'use server';
/**
 * @fileOverview An AI agent for analyzing soil health reports.
 *
 * - analyzeSoilHealth - A function that handles the soil health analysis process.
 * - AnalyzeSoilHealthInput - The input type for the analyzeSoilHealth function.
 * - AnalyzeSoilHealthOutput - The return type for the analyzeSoilHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeSoilHealthInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      "A soil health report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeSoilHealthInput = z.infer<typeof AnalyzeSoilHealthInputSchema>;

const AnalyzeSoilHealthOutputSchema = z.object({
    summary: z.string().describe('A summary of the soil health report.'),
    recommendations: z.array(z.string()).describe('A list of recommendations to improve soil health.'),
    nutrients: z.object({
        ph: z.number().describe('The pH level of the soil.'),
        nitrogen: z.number().describe('The nitrogen level in ppm.'),
        phosphorus: z.number().describe('The phosphorus level in ppm.'),
        potassium: z.number().describe('The potassium level in ppm.'),
    }).describe('The nutrient levels in the soil.'),
});
export type AnalyzeSoilHealthOutput = z.infer<typeof AnalyzeSoilHealthOutputSchema>;

export async function analyzeSoilHealth(input: AnalyzeSoilHealthInput): Promise<AnalyzeSoilHealthOutput> {
  return analyzeSoilHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSoilHealthPrompt',
  input: {schema: AnalyzeSoilHealthInputSchema},
  output: {schema: AnalyzeSoilHealthOutputSchema},
  prompt: `You are an expert soil scientist. Analyze the provided soil health report and provide a summary, recommendations, and key nutrient levels.

Soil Health Report:
{{media url=reportDataUri}}

Analyze the report and extract the pH, nitrogen, phosphorus, and potassium levels. Provide a summary of the overall soil health and give actionable recommendations for improvement.
`,
});

const analyzeSoilHealthFlow = ai.defineFlow(
  {
    name: 'analyzeSoilHealthFlow',
    inputSchema: AnalyzeSoilHealthInputSchema,
    outputSchema: AnalyzeSoilHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

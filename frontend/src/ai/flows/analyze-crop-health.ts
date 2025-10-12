'use server';
/**
 * @fileOverview A plant problem diagnosis AI agent.
 *
 * - analyzeCropHealth - A function that handles the crop diagnosis process.
 * - AnalyzeCropHealthInput - The input type for the analyzeCropHealth function.
 * - AnalyzeCropHealthOutput - The return type for the analyzeCropHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeCropHealthInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeCropHealthInput = z.infer<typeof AnalyzeCropHealthInputSchema>;

const AnalyzeCropHealthOutputSchema = z.object({
  identification: z.object({
    isPlant: z.boolean().describe('Whether or not the input is a plant.'),
    commonName: z.string().describe('The name of the identified plant.'),
    latinName: z.string().describe('The Latin name of the identified plant.'),
  }),
  diagnosis: z.object({
    isHealthy: z.boolean().describe('Whether or not the plant is healthy.'),
    diagnosis: z.string().describe("The diagnosis of the plant's health."),
    treatment: z.string().describe('The recommended treatment for the plant.'),
  }),
});
export type AnalyzeCropHealthOutput = z.infer<typeof AnalyzeCropHealthOutputSchema>;

export async function analyzeCropHealth(input: AnalyzeCropHealthInput): Promise<AnalyzeCropHealthOutput> {
  return analyzeCropHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCropHealthPrompt',
  input: {schema: AnalyzeCropHealthInputSchema},
  output: {schema: AnalyzeCropHealthOutputSchema},
  prompt: `You are an expert botanist specializing in diagnosing plant illnesses.

You will use this information to diagnose the plant, and any issues it has. You will make a determination as to whether the plant is healthy or not, what is wrong with it, and suggest a treatment.

Photo: {{media url=photoDataUri}}`,
});

const analyzeCropHealthFlow = ai.defineFlow(
  {
    name: 'analyzeCropHealthFlow',
    inputSchema: AnalyzeCropHealthInputSchema,
    outputSchema: AnalyzeCropHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

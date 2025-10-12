import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-crop-outcomes.ts';
import '@/ai/flows/generate-crop-recommendation.ts';
import '@/ai/flows/analyze-crop-health.ts';
import '@/ai/flows/chatbot.ts';
import '@/ai/flows/analyze-soil-health.ts';
import '@/ai/flows/tts.ts';
import '@/ai/tools/weather.ts';

import { createOpenAI } from '@ai-sdk/openai';
import { env } from '../env';

const openai = createOpenAI({
	apiKey: env.LLM_API_KEY,
});

export const openaiModel = openai(env.LLM_MODEL);

import { createOpenAI } from '@ai-sdk/openai';
import { env } from '../env';

const openai = createOpenAI({
	apiKey: env.LLM_API_KEY,
	baseURL: env.LLM_BASE_URL,
});

export const openaiModel = openai(env.LLM_MODEL);

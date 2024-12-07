import { createAnthropic } from '@ai-sdk/anthropic';
import { env } from '../env';

const anthropic = createAnthropic({
	apiKey: env.LLM_API_KEY,
	baseURL: env.LLM_BASE_URL,
});

export const anthropicModel = anthropic(env.LLM_MODEL);

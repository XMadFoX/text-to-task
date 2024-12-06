import { createAnthropic } from '@ai-sdk/anthropic';
import { env } from '../env';

const anthropic = createAnthropic({
	apiKey: env.LLM_API_KEY,
});

export const anthropicModel = anthropic(env.LLM_MODEL);

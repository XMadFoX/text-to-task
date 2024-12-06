import { createOpenAI } from '@ai-sdk/openai';
import { openaiEnv } from './env';

const openai = createOpenAI({
	apiKey: openaiEnv.OPENAI_API_KEY,
});

export const openaiModel = openai(openaiEnv.OPENAI_MODEL);

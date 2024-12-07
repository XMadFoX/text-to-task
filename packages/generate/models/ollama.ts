import { createOllama } from 'ollama-ai-provider';
import { env } from '../env';

const ollama = createOllama({
	baseURL: env.LLM_BASE_URL,
});

export const ollamaModel = ollama(env.LLM_MODEL);

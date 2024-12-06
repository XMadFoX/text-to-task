import { match } from 'ts-pattern';
import { env } from '../env';
import { openaiModel } from './openai';
import { anthropicModel } from './anthropic';

export const model = match(env.LLM_PROVIDER)
	.with('openai', () => openaiModel)
	.with('anthropic', () => anthropicModel)
	.exhaustive();

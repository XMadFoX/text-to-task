import OpenAI from 'openai';
import { openaiEnv } from './env';

const openai = new OpenAI({
	apiKey: openaiEnv.OPENAI_API_KEY,
});

export async function generate(systemPrompt: string, userPrompt: string) {
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{ role: 'system', content: systemPrompt },
			{
				role: 'user',
				content: userPrompt,
			},
		],
		model: openaiEnv.OPENAI_MODEL,
	});

	return chatCompletion;
}

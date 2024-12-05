import OpenAI from 'openai';
import { expctedTaskJson } from '../generate.ts';
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

	const output = chatCompletion.choices[0].message.content;
	if (!output) throw new Error('No output from OpenAI');

	const json = await parseAsync(output).catch((e) => {
		throw new Error('Failed to parse JSON from OpenAI');
	});

	return json;
}

async function parseAsync(a: string) {
	return JSON.parse(a) as expctedTaskJson;
}

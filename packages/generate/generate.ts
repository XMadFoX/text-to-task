import { openaiModel } from './openai';
import { systemPrompt } from './template';
import { generateText } from 'ai';

export type expctedTaskJson = {
	title: string;
	description: string;
	statedId: string;
	assigneeId?: string;
	projectId?: string;
	labels?: string[];
	priority?: number; // 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low
};

export async function generateTask(msg: string, ctx: string) {
	const prompt = `${systemPrompt}\n${ctx}`;
	console.debug('System prompt', prompt);

	const { text } = await generateText({
		model: openaiModel,
		system: prompt,
		prompt: msg,
	});

	const json = await parseAsync(text).catch((e) => {
		throw new Error('Failed to parse JSON from OpenAI');
	});

	return json;
}

async function parseAsync(a: string) {
	return JSON.parse(a) as expctedTaskJson;
}

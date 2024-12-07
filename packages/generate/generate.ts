import { systemPrompt } from './template';
import { generateObject } from 'ai';
import { model } from './models';
import { z } from 'zod';

const linearCreateIssueSchema = z.object({
	title: z.string(),
	description: z.string(),
	statedId: z.string(),
	assigneeId: z.string().optional(),
	projectId: z.string().optional(),
	labels: z.array(z.string()).optional(),
	priority: z.number().optional(), // 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low
});

export type expectedTaskJson = z.infer<typeof linearCreateIssueSchema>;

export async function generateTask(msg: string, ctx: string) {
	const prompt = `${systemPrompt}\n${ctx}`;
	console.debug('System prompt', prompt);

	const { object } = await generateObject({
		model,
		schema: linearCreateIssueSchema,
		system: prompt,
		prompt: msg,
	});

	return object;
}

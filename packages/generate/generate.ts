import { generate } from './openai';
import { systemPrompt } from './template';

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
  console.log(prompt);

  const json = await generate(prompt, msg);
  return json;
}

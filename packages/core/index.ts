import { createIssue, getContext as getLinearContext } from '@ttt/linear';
import type { expctedTaskJson } from '@ttt/linear';
import { env } from './env';

export async function createTask(issue: expctedTaskJson) {
	createIssue(issue);
}

export async function getContext() {
	if (env.ISSUE_TRACKER === 'linear') return await getLinearContext();
	throw new Error('Not implemented');
}

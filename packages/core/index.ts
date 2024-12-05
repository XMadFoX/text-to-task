import { createIssue, getContext as getLinearContext } from '@ttt/linear';
import type { expctedTaskJson } from '@ttt/linear';

export async function createTask(issue: expctedTaskJson) {
	createIssue(issue);
}

export async function getContext() {
	return await getLinearContext();
}

import type { IssueCreateInput } from '@linear/sdk/dist/_generated_documents';
import { client } from './client';
import { omit } from 'remeda';
import { getLabels, selectedTeam } from './getContext';

export type expctedTaskJson = {
	title: string;
	description: string;
	statedId: string;
	assigneeId?: string;
	projectId?: string;
	labels?: string[];
	priority?: number; // 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low
};

const createIssue = async (res: expctedTaskJson) => {
	console.debug('selectedTeam', selectedTeam);

	const lastLabels = (await selectedTeam.labels()).nodes;
	console.debug('og labels', res.labels);
	const labelsIds = res?.labels
		?.map((label) => lastLabels.find((l) => l.name === label)?.id)
		.filter((l) => typeof l !== 'undefined');

	console.debug(labelsIds);

	const rest = omit(res, ['labels']);

	console.debug('rest', rest);

	return client.createIssue({
		teamId: selectedTeam.id,
		labelIds: labelsIds,
		...rest,
	});
};
export { createIssue };

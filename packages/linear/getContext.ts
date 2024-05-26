import { pick } from 'remeda';
import { client } from './client';
import { linearEnv } from './env';

export { client as linearClient };

const key = linearEnv.LINEAR_TEAM_KEY;

async function getTeam() {
	const allTeams = await client.teams();
	const selectedTeam = allTeams.nodes.find((t) => t.key === key);
	if (!selectedTeam) throw new Error('Team not found');

	return selectedTeam;
}

const selectedTeam = await getTeam();
export { selectedTeam };

async function getAssignees() {
	const members = await selectedTeam?.members();

	return members.nodes.map((m) => pick(m, ['id', 'name', 'displayName']));
}

export async function getLabels() {
	const labels = await selectedTeam.labels();

	return labels.nodes.map((l) => pick(l, ['name', 'description']));
}

async function getProjects() {
	const projects = await selectedTeam.projects();

	return projects.nodes.map((p) => ({
		...pick(p, ['id', 'name', 'description']),
		status: p.status.name,
	}));
}

async function getWorkflowStates() {
	const states = await client.workflowStates({
		filter: {
			team: {
				id: { eq: selectedTeam.id },
			},
		},
	});

	return states.nodes.map((s) =>
		pick(s, ['id', 'name', 'description', 'type'])
	);
}

// yeah, prolly can get it all in once with their GQL api, but it'll do for now
export async function getContext() {
	const [assignees, labels, projects, states] = await Promise.all([
		getAssignees(),
		getLabels(),
		getProjects(),
		getWorkflowStates(),
	]);

	const ctx = `
Available objects:
assignees: ${JSON.stringify(assignees)}
labels: ${JSON.stringify(labels)}
projects: ${JSON.stringify(projects)}
states: ${JSON.stringify(states)}
	`;

	return ctx;
}

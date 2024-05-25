import { LinearClient } from '@linear/sdk';
import { linearEnv } from './env';

export const client = new LinearClient({
	apiKey: linearEnv.LINEAR_API_KEY,
});

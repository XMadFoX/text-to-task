import { z } from 'zod';

const linearEnvSchema = z.object({
	LINEAR_API_KEY: z.string(),
	LINEAR_TEAM_KEY: z.string(),
});

const linearEnv = linearEnvSchema.parse(process.env);
export { linearEnv };

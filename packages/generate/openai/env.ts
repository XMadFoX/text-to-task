import { z } from 'zod';

const openaiEnvSchema = z.object({
	OPENAI_API_KEY: z.string(),
	OPENAI_MODEL: z.string(),
});

const openaiEnv = openaiEnvSchema.parse(process.env);
export { openaiEnv };

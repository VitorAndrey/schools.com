import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environent variables!");
}

export const env = _env.data;

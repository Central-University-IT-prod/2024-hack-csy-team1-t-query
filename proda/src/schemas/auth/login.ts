import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Некорректный email"),
	password: z.string()
});

export type TypeLoginSchema = z.infer<typeof loginSchema>;

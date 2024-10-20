import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string(),
		email: z.string().email("Некорректный email"),
		password: z.string(),
		passwordRepeat: z.string()
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: "Пароли не совпадают",
		path: ["passwordRepeat"]
	});

export type TypeRegisterSchema = z.infer<typeof registerSchema>;

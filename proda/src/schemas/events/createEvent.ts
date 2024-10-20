import { z } from "zod";

export const createEventSchema = z.object({
	title: z.string(),
	startDate: z.date(),
	enddate: z.date()
});

export type TypeCreateEventSchema = z.infer<typeof createEventSchema>;

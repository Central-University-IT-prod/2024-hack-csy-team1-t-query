"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui";
import { IEvent } from "@/types";

export const Evento = ({ title, start_date, end_date, stands }: IEvent) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>начало : {start_date.toString()}</p>
				<p>конец: {end_date.toString()}</p>
			</CardContent>
		</Card>
	);
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { IEvent } from "@/types";

export const EventData = ({ title, start_date, end_date, stand }: IEvent) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>начало: {start_date.toString()}</p>
				<p>конец: {end_date.toString()}</p>
			</CardContent>
		</Card>
	);
};

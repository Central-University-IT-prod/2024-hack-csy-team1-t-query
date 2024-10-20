import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui";
import { standService } from "@/services/stands.service";
import { IStand } from "@/types";

export const Stand = ({ title, maxDuration, users, description }: IStand) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				Очередь:{" "}
				{users.map((user, i) => (
					<div key={i}>{user.login}</div>
				))}
			</CardContent>
		</Card>
	);
};

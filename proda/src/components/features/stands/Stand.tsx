"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui";
import { isLogin } from "@/lib/isLogin";
import { standService } from "@/services/stand.service";

export const Stand = ({ id }: { id: string }) => {
	const { data, isLoading, refetch, isFetched } = useQuery({
		queryKey: ["update queue"],
		queryFn: () => standService.getById(id),
		enabled: false
	});

	useEffect(() => {
		isLogin();
	}, []);

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>{data?.title}</CardTitle>
				<CardDescription>{data?.description}</CardDescription>
			</CardHeader>
			<CardContent>
				{isFetched && (
					<div>
						Очередь:{" "}
						{data?.users.map((user, i) => (
							<div key={i}>{user.login}</div>
						))}
					</div>
				)}
			</CardContent>
			<Button onClick={() => refetch()}>Обновить данные</Button>
		</Card>
	);
};

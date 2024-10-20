"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Queue } from "../queues/Queue";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui";
import { isLogin } from "@/lib/isLogin";
import { standService } from "@/services/stands.service";

export const Stand = ({ id }: { id: string }) => {
	const { data, isLoading, refetch, isFetched } = useQuery({
		queryKey: ["update queue"],
		queryFn: () => standService.getById(id)
	});

	useEffect(() => {
		isLogin();
	}, []);

	// if (isLoading) return "Загрузка";

	return (
		<div className="flex flex-col items-center gap-6">
			{isLoading ? (
				<Loader className="animate-spin" />
			) : (
				<>
					<h2 className="text-3xl">
						В очереди {data?.user?.length} человек
					</h2>
					<Button
						onClick={() => refetch()}
						className="w-auto text-xl"
					>
						Обновить данные
					</Button>
					<Card className="w-full">
						<CardHeader>
							<CardTitle>{data?.title}</CardTitle>
							<CardDescription>
								{data?.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Queue {...data!} />
						</CardContent>
					</Card>
				</>
			)}
		</div>
	);
};

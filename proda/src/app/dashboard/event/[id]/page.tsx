"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { NotFound } from "@/components/elements/NotFound";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";
import { eventsService } from "@/services/event.service";

export default function EventPage({ params }: { params: { id: string } }) {
	const { data, isLoading } = useQuery({
		queryKey: ["event by id"],
		queryFn: () => eventsService.getById(params.id)
	});

	useEffect(() => {
		isLogin();
	}, []);

	if (isLoading) return <DashboardLayout>Загрузка...</DashboardLayout>;

	if (!data)
		return (
			<DashboardLayout>
				<NotFound />
			</DashboardLayout>
		);

	return (
		<DashboardLayout>
			<div className="">
				<h2>{data.title}</h2>
				<div>
					{data.stand.map((stand) => (
						<Link
							href={`/dashboard/event/${data.id}/stand/${stand.id}`}
							className=""
						>
							{stand.title}
						</Link>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
}

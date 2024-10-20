"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { CreateEventModal } from "@/components/features/events/modals/CreateEventModal";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";
import { eventsService } from "@/services/event.service";

export default function DashboardPage() {
	const { data: events, isLoading } = useQuery({
		queryKey: ["get events"],
		queryFn: () => eventsService.getAll()
	});

	useEffect(() => {
		isLogin();
	}, []);

	return (
		<DashboardLayout>
			<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
				<h2 className="font-semibold">
					Создайте новое мероприятие или выберите существующее
				</h2>
				<CreateEventModal />
			</div>

			<div>
				<h3 className="text-xl">Ваши мероприятия</h3>
				{isLoading ? (
					"Загрузка"
				) : (
					<div className="pl-5">
						{events?.map((event) => (
							<Link
								key={event.id}
								href={`/dashboard/event/${event.id}`}
							>
								{event.title}
							</Link>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}

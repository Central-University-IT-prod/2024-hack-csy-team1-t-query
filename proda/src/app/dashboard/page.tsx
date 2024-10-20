"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { CreateEventModal } from "@/components/features/events/modals/CreateEventModal";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";
import { eventsService } from "@/services/events.service";

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

			<div className="pt-4">
				<h3 className="text-3xl">Ваши мероприятия</h3>
				{isLoading ? (
					<Loader className="animate-spin" />
				) : (
					<div className="pl-5">
						{events?.map((event) => (
							<div
								className="rounded-sm bg-slate-100 hover:scale-110"
								key={event.id}
							>
								<Link
									href={`/dashboard/event/${event.id}`}
									className="text-xl"
								>
									{event.title}
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}

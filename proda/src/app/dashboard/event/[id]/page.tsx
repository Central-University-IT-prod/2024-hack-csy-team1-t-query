"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { CreateStandModal } from "@/components/features/stands/modals/CreateStandModal";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";
import { eventsService } from "@/services/events.service";
import { standService } from "@/services/stands.service";

export default function EventPage({ params }: { params: { id: string } }) {
	const { data: event, isLoading } = useQuery({
		queryKey: ["event by id"],
		queryFn: () => eventsService.getById(params.id)
	});

	const { data: stands } = useQuery({
		queryKey: ["stands by eventId"],
		queryFn: () => standService.getAll(params.id)
	});

	useEffect(() => {
		isLogin();
	}, []);

	return (
		<DashboardLayout>
			<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
				<h2 className="font-semibold">
					Создайте новый стенд или выберите существующий
				</h2>
				<CreateStandModal />
			</div>

			<div>
				<h3 className="text-3xl">Стенды для {event?.title}</h3>
				{isLoading ? (
					<Loader className="animate-spin" />
				) : (
					<div className="pl-5">
						{stands?.map((stand) => (
							<div
								className="rounded-sm bg-slate-100 hover:scale-110"
								key={stand.id}
							>
								<Link href={`/dashboard/event/${stand.id}`}>
									{stand.title}
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}

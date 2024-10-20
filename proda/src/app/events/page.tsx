"use client";

import { useQuery } from "@tanstack/react-query";
import { Evento } from "@/components/features/events/Evento";
import { CreateEvent } from "@/components/features/events/forms/CreateEvent";
import { eventsService } from "@/services/events.service";

export default function AllEventsPage() {
	// const { data, isPending } = useQuery({
	// 	queryKey: ["all events"],
	// 	queryFn: () => eventsService.getAll()
	// });

	// console.log(data);

	// if (!data || isPending) return "Loading";

	// return (
	// 	<div>
	// 		{data.map((item, i) => (
	// 			<Evento {...item} key={i} />
	// 		))}

	// 	</div>
	// );

	return <CreateEvent />;
}

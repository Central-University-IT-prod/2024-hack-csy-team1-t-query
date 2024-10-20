import { apiWithAuth } from "@/api/instance";
import { IEvent } from "@/types";

class EventsService {
	async getAll() {
		const { data } = await apiWithAuth.get<IEvent[]>("events");

		return data;
	}

	async getById(id: string) {
		const { data } = await apiWithAuth.get<IEvent>(`events/${id}`);

		return data;
	}

	
}

export const eventsService = new EventsService();

import { apiWithAuth } from "@/api/instance";
import { IEvent } from "@/types";

class EventsService {
	async getAll() {
		const { data } = await apiWithAuth.get<IEvent[]>("event");

		return data;
	}

	async getById(id: string) {
		const { data } = await apiWithAuth.get<IEvent>(`event/${id}`);

		return data;
	}

	async create(body: IEvent) {
		const { data } = await apiWithAuth.post<IEvent>("event/", body);

		return data;
	}
}

export const eventsService = new EventsService();

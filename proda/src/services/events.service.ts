import { api } from "@/api/instance";
import { IEvent } from "@/types";

class EventsService {
	async getAll() {
		const response = await api.get<IEvent[]>("event", {
			headers: {
				Authorization: "Token {{sensitive data}}"
			}
		});

		return response.data;
	}
}

export const eventsService = new EventsService();

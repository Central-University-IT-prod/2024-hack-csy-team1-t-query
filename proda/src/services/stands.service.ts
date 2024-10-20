import { apiWithAuth } from "@/api/instance";
import { IStand } from "@/types";

class StandService {
	async getAll(eventId: string) {
		const { data } = await apiWithAuth.get<IStand[]>(
			`stands_by_event_id/${eventId}`
		);

		return data;
	}

	async getById(id: string) {
		const { data } = await apiWithAuth.get<IStand>(`stand/${id}`);

		return data;
	}

	async deleteUserFromStand(username: string, standId: string) {
		await apiWithAuth.delete(
			`delete_user_from_stand/${standId}/${username}`
		);
	}

	async create(body: IStand) {
		const { data } = await apiWithAuth.post("stand/", body);

		return data;
	}
}

export const standService = new StandService();

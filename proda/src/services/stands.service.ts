import { api } from "@/api/instance";
import { IStand } from "@/types";

class StandService {
	async getAll() {
		const response = await api.get<IStand[]>("stands");

		return response;
	}
}

export const standService = new StandService();

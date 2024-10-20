import { apiWithAuth } from "@/api/instance";
import { IStand } from "@/types";

class StandService {
	async getAll() {
		const { data } = await apiWithAuth.get<IStand[]>("stands");

		return data;
	}

	async getById(id: string) {
		const { data } = await apiWithAuth.get<IStand>(`stands:${id}`);

		return data;
	}

	async deleteUserFromStand(body: { username: string; stand_id: string }) {
		await apiWithAuth.delete("stands", {
			data: body
		});
	}

	async create(body: any) {
		await apiWithAuth.post("stand/", body);
	}
}

export const standService = new StandService();

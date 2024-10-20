import { apiWithAuth } from "@/api/instance";
import { ITgUser } from "@/types";

class UserService {
	async getById(id: string) {
		const { data } = await apiWithAuth<ITgUser>(`tguser/${id}`);

		return data;
	}
}

export const userService = new UserService();

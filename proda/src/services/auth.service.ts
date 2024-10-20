import { api } from "@/api/instance";

class AuthService {
	async authTest(body: { username: string; password: string }) {
		const response = await api.post("api-token-auth/", body);

		return response;
	}
}

export const authService = new AuthService();

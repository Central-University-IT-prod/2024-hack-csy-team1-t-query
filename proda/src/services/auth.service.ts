import { apiClassic } from "@/api/instance";

class AuthService {
	async authTest(body: { username: string; password: string }) {
		const { data } = await apiClassic.post<{ token: string }>(
			"api-token-auth/",
			body
		);

		return data;
	}
}

export const authService = new AuthService();

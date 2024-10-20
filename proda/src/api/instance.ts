import axios, { CreateAxiosDefaults } from "axios";
import { getCookie } from "cookies-next";

const options: CreateAxiosDefaults = {
	baseURL: process.env.SERVER_URL
};

const apiClassic = axios.create(options);
const apiWithAuth = axios.create(options);

apiWithAuth.interceptors.request.use((config) => {
	const token = getCookie("token");

	if (config && config.headers && token)
		config.headers.Authorization = `Token ${token}`;

	return config;
});

export { apiClassic, apiWithAuth };

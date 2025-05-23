import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const httpClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache, no-store, must-revalidate",
		Pragma: "no-cache",
		Expires: "0",
	},
});

// Add request interceptor if needed
httpClient.interceptors.request.use(
	(config) => {
		// You can add auth token here if needed
		// const token = localStorage.getItem("token");
		// if (token) {
		//     config.headers.Authorization = `Bearer ${token}`;
		// }

		// Add a timestamp parameter to prevent caching
		if (config.method === "get") {
			config.params = {
				...config.params,
				_t: new Date().getTime(),
			};
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Add response interceptor if needed
httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle errors globally
		console.error("API Error:", error);
		return Promise.reject(error);
	},
);

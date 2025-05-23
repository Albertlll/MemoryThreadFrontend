import { httpClient } from "../../../shared/api";
import type { Veteran } from "../model";

const BASE_PATH = "/veterans";

export const veteranApi = {
	getAll: async (): Promise<Veteran[]> => {
		const response = await httpClient.get<Veteran[]>(BASE_PATH);
		return response.data;
	},

	getById: async (id: number): Promise<Veteran> => {
		const response = await httpClient.get<Veteran>(`${BASE_PATH}/${id}`);
		return response.data;
	},

	create: async (veteran: Omit<Veteran, "id">): Promise<Veteran> => {
		const response = await httpClient.post<Veteran>(BASE_PATH, veteran);
		return response.data;
	},

	update: async (id: number, veteran: Partial<Veteran>): Promise<Veteran> => {
		const response = await httpClient.put<Veteran>(
			`${BASE_PATH}/${id}`,
			veteran,
		);
		return response.data;
	},

	delete: async (id: number): Promise<void> => {
		await httpClient.delete(`${BASE_PATH}/${id}`);
	},
};

import { httpClient } from "../../../shared/api";
import type { Place } from "../model";

const BASE_PATH = "/places";

export const placeApi = {
	getAll: async (): Promise<Place[]> => {
		const response = await httpClient.get<Place[]>(BASE_PATH);
		return response.data;
	},

	getByYear: async (year: number): Promise<Place[]> => {
		const response = await httpClient.get<Place[]>(BASE_PATH, {
			params: { year },
		});
		return response.data;
	},

	getById: async (id: number): Promise<Place> => {
		const response = await httpClient.get<Place>(`${BASE_PATH}/${id}`);
		return response.data;
	},

	create: async (place: Omit<Place, "id">): Promise<Place> => {
		const response = await httpClient.post<Place>(BASE_PATH, place);
		return response.data;
	},

	update: async (id: number, place: Partial<Place>): Promise<Place> => {
		const response = await httpClient.put<Place>(`${BASE_PATH}/${id}`, place);
		return response.data;
	},

	delete: async (id: number): Promise<void> => {
		await httpClient.delete(`${BASE_PATH}/${id}`);
	},
};

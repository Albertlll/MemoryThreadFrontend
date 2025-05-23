import { httpClient } from "../../../shared/api";
import type { EventVeteransGraph } from "../model";

const BASE_PATH = "/events";

export const eventApi = {
	getVeteransGraph: async (
		eventId: string | number,
	): Promise<EventVeteransGraph> => {
		const response = await httpClient.get<EventVeteransGraph>(
			`${BASE_PATH}/${eventId}/veterans-graph`,
		);
		return response.data;
	},
};

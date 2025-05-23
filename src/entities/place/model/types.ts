export interface Place {
	id: number;
	name: string;
	historical_name?: string;
	description: string;
	latitude: number;
	longitude: number;
	year?: number;
}

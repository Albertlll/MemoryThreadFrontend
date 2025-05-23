export interface Veteran {
	id: number;
	firstName: string;
	lastName: string;
	middleName?: string;
	birthDate?: string;
	deathDate?: string;
	biography?: string;
	photoUrl?: string;
	placeIds?: number[]; // IDs of places associated with this veteran
}

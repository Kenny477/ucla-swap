import { ImageFile } from './file';

export interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	files: ImageFile[];
	condition: 0 | 1 | 2 | 3 | 4 | 5;
	created_at: string;
	category: "Books" | "Electronics" | "Furniture" | "Clothing" | "Vehicles" | "Other";
	user: {
		id: string;
		email: string;
	}
}
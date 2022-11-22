import { ImageFile } from './file';

export interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	files: ImageFile[];
	condition: number;
	created_at: string;
	category: "Books" | "Electronics" | "Furniture" | "Clothing" | "Vehicles" | "Other";
}
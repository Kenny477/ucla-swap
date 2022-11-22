export interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	condition: number;
	created_at: string;
	category: "Books" | "Electronics" | "Furniture" | "Clothing" | "Vehicles" | "Other";
}
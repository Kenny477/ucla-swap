export interface Listing {
	id: string;
	title: string;
	description: string;
	created_at: string;
	category: "Books" | "Electronics" | "Furniture" | "Clothing" | "Vehicles" | "Other";
}
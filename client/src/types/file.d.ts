export interface ImageFile {
	id: string;
	filename: string;
	mimetype: string;
	size: number;
	listingId: string;
}

export type ImageWithPreview = File & {
	preview: string;
}
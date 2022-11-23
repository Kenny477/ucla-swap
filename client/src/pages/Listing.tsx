import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ImageWithPreview, Listing as ListingType } from "../types";
import Gallery from "../components/Gallery";

function Listing() {
	const [listing, setListing] = useState<ListingType>({} as ListingType);
	const [images, setImages] = useState<ImageWithPreview[]>([]);
	const { id } = useParams();

	const [cookies, setCookie] = useCookies();

	useEffect(() => {
		const endpoint = `/api/listing/${id}`;
		axios
			.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			.then((res) => {
				setListing(res.data);
				return res.data;
			}).then(async (listing: ListingType) => {
				const images = await Promise.all(listing.files.map((file) => {
					const res = axios.get(`/api/listing/${listing.id}/image/${file.id}`, {
						responseType: "blob",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${cookies.access_token}`,
						},
					}).then((res) => {
						const f = new File([res.data], file.filename, { type: res.data.type });
						return Object.assign(f, { preview: URL.createObjectURL(res.data) });
					});
					return res;
				}));
				setImages(images);
			});
	}, [id]);

	return (
		<div className="grid grid-cols-4 p-10">
			<h1 className="col-span-4 text-2xl font-bold">{listing.title}</h1>
			<p className="col-span-4 text-lg font-semibold">${listing.price}</p>
			<p className="col-span-4 text-md">Contact the listing owner at <a href={`mailto:${listing.user?.email}`}>{listing.user?.email}</a></p>
			<div className="col-span-4">
				<Gallery images={images} />
			</div>
			<p className="col-span-4">{listing.description}</p>
		</div>
	);
}

export default Listing;

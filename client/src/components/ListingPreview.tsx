import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { ImageWithPreview, Listing } from "../types";

function ListingPreview({ listing }: { listing: Listing }) {
	const [liked, setLiked] = useState(false);
	const [image, setImage] = useState<ImageWithPreview>({} as ImageWithPreview);
	const [cookies] = useCookies(["access_token"]);

	// Update cover image
	useEffect(() => {
		const coverImage = listing.files[0];
		if (coverImage) {
			const res = axios.get(`/api/listing/${listing.id}/image/${coverImage.id}`, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${cookies.access_token}`,
				},
			}).then((res) => {
				const f = new File([res.data], coverImage.filename, { type: res.data.type });
				return Object.assign(f, { preview: URL.createObjectURL(res.data) });
			}).then((image) => {
				setImage(image);
			});
		}
	}, [listing]);

	// Get if listing is liked or not
	useEffect(() => {
		const url = `/api/listing/${listing.id}/like`;
		axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${cookies.access_token}`,
			},
		}).then((res) => {
			setLiked(res.data);
		});
	}, [listing]);

	function handleLike() {
		const url = `/api/listing/${listing.id}/like`;
		axios.post(url, {}, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${cookies.access_token}`,
			},
		}).then((res) => {
			setLiked(res.data);
		});
	}

	return (
		<div className="col-span-1 shadow-md rounded-md p-2 flex flex-col">
			<NavLink to={`/listing/${listing.id}`}>
				<h1 className="text-lg font-bold">{listing.title}</h1>
				<p className="text-md font-bold">${listing.price}</p>
				<img className="row-span-1 aspect-square w-full object-contain" alt={image.name} src={image.preview} />
			</NavLink>
			<div className="grid grid-cols-6">
				<div className="col-span-5 flex flex-col justify-center">
					<p className="text-md">{new Date(listing.created_at).toLocaleDateString()}</p>
				</div>
				<div className="col-span-1 aspect-square p-3 flex items-center justify-center">
					{liked ? <HiHeart className="w-6 h-6 fill-red-500" onClick={handleLike} /> : <HiOutlineHeart className="w-6 h-6" onClick={handleLike} />}
				</div>
			</div>
		</div>
	);
}

export default ListingPreview;

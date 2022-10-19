import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Listing as ListingType } from "../types";

function Listing() {
	const [listing, setListing] = useState<ListingType>({} as ListingType);
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
				// console.log(res.data);
				setListing(res.data);
			});
	}, [id]);

	return (
		<div className="grid grid-cols-4">
			<h1 className="col-span-4">{listing.title}</h1>
			<p className="col-span-4">{listing.description}</p>
		</div>
	);
}

export default Listing;

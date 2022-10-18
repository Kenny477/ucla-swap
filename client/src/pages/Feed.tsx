import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Feed() {
	const [listings, setListings] = useState<any[]>([]);
	const [search, setSearch] = useState("");

  const [cookies, setCookie] = useCookies();

	useEffect(() => {
		const endpoint = "/api/listing";
		axios
			.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			.then((res) => {
				setListings(res.data);
			});
	});

	return (
		<div className="grid grid-cols-4 grid-rows-6 px-20 h-full">
			<div className="col-span-4 row-span-1 flex flex-row justify-center items-center py-4">
				<h1 className="text-lg">Feed</h1>
				<NavLink
					to="/new-listing"
					className="bg-primary text-white rounded-lg p-4 flex flex-row items-center space-x-2 absolute right-20"
				>
					<FaPlus />
					<p>New Listing</p>
				</NavLink>
			</div>
			<div className="col-span-1 row-span-5 border-primary_lighter border-r px-10 flex flex-col space-y-2">
				<div>
					<h2 className="text-lg">Search</h2>
					<div className="flex flex-row justify-between items-center space-x-4">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="focus:outline-0 border-b focus:border-primary_darker border-primary_lighter w-full"
						/>
						<FaSearch className="text-primary_lighter hover:text-primary_darker hover:cursor-pointer h-6 w-6" />
					</div>
				</div>
				<div>
					<h2 className="text-lg">Categories</h2>
					<input
						type="checkbox"
						id="category1"
						name="category1"
						value="category1"
					/>
					<label htmlFor="category1">Category 1</label>
				</div>
			</div>
			<div className="col-span-3 row-span-5">
				<h1>Right</h1>
				{listings.map((listing) => {
					return <div>{listing.title}</div>;
				})}
			</div>
		</div>
	);
}

export default Feed;

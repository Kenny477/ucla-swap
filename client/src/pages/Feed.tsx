import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import ListingPreview from "../components/ListingPreview";
import { debounce } from "lodash";
import { Listing } from "../types";

function Feed() {
	const categories: Listing["category"][] = [
		"Books",
		"Electronics",
		"Furniture",
		"Clothing",
		"Vehicles",
		"Other",
	];
	const [selected, setSelected] = useState<{ [key: string]: boolean }>(
		categories.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
	);
	const [listings, setListings] = useState<Listing[]>([]);
	const [search, setSearch] = useState("");
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

	const [cookies, setCookie] = useCookies();

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	const debouncedSearch = useMemo(() => {
		return debounce(handleSearch, 300);
	}, []);

	useEffect(() => debouncedSearch.cancel());

	function handleFilter(listing: Listing) {
		const searchInDescription = listing.description
			.toLowerCase()
			.includes(search.toLowerCase());
		const searchInTitle = listing.title
			.toLowerCase()
			.includes(search.toLowerCase());

		const selectedCategories = Object.keys(selected).filter(
			(category) => selected[category]
		);
		let filter = (searchInDescription || searchInTitle);
		if (selectedCategories)
			filter &&= selectedCategories.includes(listing.category);
		if (minPrice !== undefined) filter &&= listing.price >= minPrice;
		if (maxPrice !== undefined) filter &&= listing.price <= maxPrice;
		return filter;
	}

	useEffect(() => {
		const endpoint = "/api/listing";
		axios
			.get(endpoint, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			.then((res: AxiosResponse) => {
				setListings(res.data);
			});
	}, []);

	return (
		<div className="grid grid-cols-4 grid-rows-6 px-10 h-full pb-10">
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
			<div className="col-span-1 row-span-5 border-primary_lighter border-r px-4 flex flex-col space-y-2">
				<div>
					<h2 className="text-lg">Search</h2>
					<div className="flex flex-row justify-between items-center space-x-4">
						<input
							type="text"
							title="search"
							onChange={debouncedSearch}
							className="focus:outline-0 border-b focus:border-primary_darker border-primary_lighter w-full"
						/>
						{/* <FaSearch className="text-primary_lighter hover:text-primary_darker cursor-pointer h-6 w-6" /> */}
					</div>
				</div>
				<div>
					<h2 className="text-lg">Categories</h2>
					{categories.map((category: string) => (
						<div
							key={category}
							className="flex flex-row justify-start items-center space-x-2 w-full text-lg"
						>
							<input
								type="checkbox"
								id={`category_${category}`}
								name={`category_${category}`}
								checked={selected[category]}
								onChange={() =>
									setSelected({
										...selected,
										[category]: !selected[category],
									})
								}
								className="h-4 w-4 accent-primary"
							/>
							<label htmlFor={`category_${category}`}>
								{category}
							</label>
						</div>
					))}
				</div>
				<div>
					<h2 className="text-lg">Price</h2>
					<div className="flex flex-row justify-between items-center space-x-4">
						<input
							type="number"
							title="min"
							placeholder="Minimum"
							min={0}
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.valueAsNumber === 0 || e.target.value ? e.target.valueAsNumber : undefined)}
							className="focus:outline-0 border-b focus:border-primary_darker border-primary_lighter w-full"
						/>
						<p>-</p>
						<input
							type="number"
							title="max"
							placeholder="Maximum"
							min={0}
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.valueAsNumber === 0 || e.target.value ? e.target.valueAsNumber : undefined)}
							className="focus:outline-0 border-b focus:border-primary_darker border-primary_lighter w-full"
						/>
					</div>
				</div>
			</div>
			<div className="col-span-3 row-span-5 overflow-y-scroll grid grid-cols-3 auto-rows-max gap-4 px-4">
				{listings
					.filter((listing) => handleFilter(listing))
					.map((listing) => {
						return (
							<ListingPreview
								key={listing.id}
								listing={listing}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default Feed;

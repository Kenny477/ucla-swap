import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Listing } from "../types";
import { FaAngleDown } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";

function NewListing() {
	const categories: Listing["category"][] = [
		"Books",
		"Electronics",
		"Furniture",
		"Clothing",
		"Vehicles",
		"Other",
	];

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("Choose a category");
	const [cookies, setCookie] = useCookies();
	const [error, setError] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	const navigate = useNavigate();

	async function handlePost() {
		const endpoint = "/api/listing/create";
		const data = {
			title,
			description,
		};
		const res = await axios
			.post(endpoint, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			.then((res) => {
				// console.log(res);
				setError("");
				navigate(`/listing/${res.data.id}`);
			})
			.catch((err) => {
				// console.log(err);
				if (err.response.data.statusCode === 400) {
					setError(err.response.data.message);
				}
			});
	}

	function handleImage() {}

	return (
		<div className="grid grid-cols-4 grid-rows-6 bg-primary_lightest px-10 space-y-4 h-full gap-4 pb-10">
			<div className="col-span-4 row-span-1 flex flex-row justify-center items-center py-4">
				<h1 className="text-xl">Create Listing</h1>
			</div>
			<div className="col-span-3 col-start-1 row-start-2 row-span-1 flex flex-col space-y-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					className="w-full focus:outline-0 rounded-md p-2"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="col-span-3 col-start-1 row-start-3 row-span-3 flex flex-col space-y-2">
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					className="resize-none w-full h-full focus:outline-none rounded-md p-2"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="col-span-1 col-start-4 row-start-2 row-span-1 flex flex-col space-y-2">
				<label htmlFor="price">Price</label>
				<input
					type="text"
					id="price"
					name="title"
					className="w-full focus:outline-0 rounded-md p-2"
					value={price}
					onChange={(e) => setPrice(parseFloat(e.target.value))}
				/>
			</div>
			<div className="col-span-1 col-start-4 row-start-3 row-span-3 flex flex-col focus:outline-none select-none ">
				<label htmlFor="category">Category</label>
				<div
					onClick={() => setShowDropdown(!showDropdown)}
					className="bg-white p-2 flex flex-row justify-between items-center mt-2"
				>
					{category}
					<FaAngleDown />
				</div>
				{showDropdown &&
					categories.map((c) => (
						<div
							key={c}
							className={`p-2 ${
								c === category ? "bg-slate-200" : "bg-white"
							} border-[0.5px] border-b-slate-200`}
							onClick={() => {
								setCategory(c);
								setShowDropdown(false);
							}}
						>
							{c}
						</div>
					))}
			</div>
			<div className="col-span-1 row-span-1">
				<button
					type="button"
					className="bg-primary text-white p-4 rounded-lg flex flex-row items-center space-x-2"
					onClick={handleImage}
				>
					<HiPhotograph />
					<p>Upload Image</p>
				</button>
			</div>
			<div className="col-span-2 row-span-1 justify-self-center">
				<p className="text-red-600">{error}</p>
			</div>
			<div className="col-span-1 row-span-1 justify-self-end">
				<button
					type="button"
					className="bg-primary text-white rounded-lg p-4 flex flex-row items-center space-x-2"
					onClick={handlePost}
				>
					<p>Post</p>
				</button>
			</div>
		</div>
	);
}

export default NewListing;
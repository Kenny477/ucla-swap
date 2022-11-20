import React, { useEffect, useState } from "react";
import axios, { AxiosPromise } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Listing, ImageFile } from "../types";
import { FaAngleDown } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import ImageUpload, { ImageWithPreview } from "../components/ImageUpload";

interface FormErrors {
	title?: string;
	description?: string;
	category?: string;
	price?: string;
	images?: string;
}

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
	const [images, setImages] = useState<ImageWithPreview[]>([]);
	const [category, setCategory] = useState("");
	const [condition, setCondition] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
	const [cookies, setCookie] = useCookies();
	const [errors, setErrors] = useState<FormErrors>({
		title: "",
		description: "",
		price: "",
		category: "",
		images: "",
	});
	const [error, setError] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [showImageUpload, setShowImageUpload] = useState(false);
	const [triedSubmit, setTriedSubmit] = useState(false);

	const navigate = useNavigate();

	async function upload(listingId: Listing["id"]) {
		const endpoint = "/api/file";
		const formData = new FormData();
		formData.append("listingId", listingId);
		const imagesWithListing = images.map((image) =>
			Object.assign(image, { listingId })
		);
		imagesWithListing.forEach((image) => {
			formData.append("file", image);
		});
		return axios
			.post(endpoint, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
	}

	const thumbnails = images.map((file) => (
		<div className="" key={file.name}>
			<div className="">
				<img
					src={file.preview}
					alt={file.name}
					className="h-6"
					// Revoke data uri after image is loaded
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
			</div>
		</div>
	));

	useEffect(() => {
		if (!triedSubmit) return;
		const errors = {
			title: title ? "" : "Title is required",
			description: description ? "" : "Description is required",
			price: isFinite(price) ? "" : "Price is required",
			category: categories.includes(category as Listing["category"]) ? "" : "Category is required",
			condition: condition ? "" : "Condition is required",
			images: images.length ? "" : "At least one image is required",
		}
		setErrors(errors);
	}, [title, description, price, category, images, triedSubmit]);

	async function handlePost() {
		setTriedSubmit(true);
		const endpoint = "/api/listing/create";
		const data = {
			title,
			description,
			price,
			category,
		};
		const res = await axios
			.post(endpoint, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
			.then(async (res) => {
				// console.log(res);
				const files = await upload(res.data.id);
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

	function handleImage() {
		setShowImageUpload(true);
	}

	function addImages(newImages: ImageWithPreview[]) {
		const newImagesWithPreview = newImages.map((image) =>
			Object.assign(image, {
				preview: URL.createObjectURL(image),
			})
		);
		setImages([...images, ...newImagesWithPreview]);
	}

	return (
		<>
			<div className="grid grid-cols-4 bg-primary_lightest px-10 space-y-4 min-h-full gap-4 pb-10">
				<div className="col-span-4 row-span-1 flex flex-row justify-center items-center py-4">
					<h1 className="text-xl">Create Listing</h1>
				</div>
				<div className="col-span-4 col-start-1 row-start-2 row-span-1 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4"><label htmlFor="title">Title</label>
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title}</p>
						)}
					</div>
					<input
						type="text"
						id="title"
						name="title"
						className={`w-full rounded-md p-2 ${errors.title ? "outline outline-red-500" : "focus:outline-none"}`}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="col-span-4 col-start-1 row-start-3 row-span-3 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="description">Description</label>
						{errors.description && (
							<p className="text-red-500 text-sm">{errors.description}</p>
						)}
					</div>
					<textarea
						name="description"
						id="description"
						className={`resize-none w-full h-full rounded-md p-2 ${errors.description ? "outline outline-red-500" : "focus:outline-none"}`}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="col-span-4 col-start-1 row-span-1 row-start-6">
					<ImageUpload setShowImageUpload={setShowImageUpload} addImages={addImages} />
				</div>
				{/* <div className="col-span-1 row-span-1 row-start-6">
					{thumbnails}
				</div> */}
				<div className="col-span-4 col-start-1 row-start-7 row-span-1 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="category">Category</label>
						{errors.category && (
							<p className="text-red-500 text-sm">{errors.category}</p>
						)}
					</div>
					<div
						onClick={() => setShowDropdown(!showDropdown)}
						className={`bg-white p-2 rounded-md flex flex-row justify-between items-center ${errors.description ? "outline outline-red-500" : "focus:outline-none"}`}
					>
						{category ? category : "Select a category"}
						<FaAngleDown />
					</div>
					<div>
						{showDropdown &&
							categories.map((c, i) => (
								<div
									key={c}
									className={`p-2 ${c === category ? "bg-slate-200" : "bg-white"
										} border-[0.5px] border-b-slate-200 ${i === categories.length - 1 ? "rounded-b-md" : ""} ${i === 0 ? "rounded-t-md" : ""} shadow-2xl`}
									onClick={() => {
										setCategory(c);
										setShowDropdown(false);
									}}
								>
									{c}
								</div>
							))}
					</div>

				</div>
				<div className="col-span-1 col-start-1 row-start-8 row-span-1 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="price">Price</label>
						{errors.price && (
							<p className="text-red-500 text-sm">{errors.price}</p>
						)}
					</div>
					<input
						type="number"
						id="price"
						min="0.00"
						step="0.01"
						name="title"
						className={`w-full focus:outline-0 rounded-md p-2 ${errors.price ? "outline outline-red-500" : "focus:outline-none"}`}
						value={price}
						onChange={(e) => setPrice(+e.target.valueAsNumber.toFixed(2))}
					/>
				</div>
				<div className="col-span-4 row-span-1 row-start-8">
					<label htmlFor="condition">Condition</label>
					<div className="grid grid-cols-5 grid-rows-1 gap-2">
						<button type="button" className="flex flex-col text-left p-2 bg-white rounded-md" onClick={() => setCondition(5)}>
							New
							<small>
								New with original packaging. Never used.
							</small>
						</button>
						<button type="button" className="flex flex-col text-left p-2 bg-white rounded-md" onClick={() => setCondition(4)}>
							Like New
							<small>
								New with original packaging. Never used.
							</small>
						</button>
						<button type="button" className="flex flex-col text-left p-2 bg-white rounded-md" onClick={() => setCondition(3)}>
							Good
							<small>
								Gently used with only minor flaws.
							</small>
						</button>
						<button type="button" className="flex flex-col text-left p-2 bg-white rounded-md" onClick={() => setCondition(2)}>
							Fair
							<small>
								Used but functional with some signs of wear.
							</small>
						</button>
						<button type="button" className="flex flex-col text-left p-2 bg-white rounded-md" onClick={() => setCondition(1)}>
							Poor
							<small>
								Damaged or with flaws. May not be usable.
							</small>
						</button>
					</div>
				</div>
				<div className="col-span-4 row-span-1 row-start-9 justify-self-end">
					<button
						type="button"
						className="bg-primary text-white rounded-lg p-4 flex flex-row items-center space-x-2"
						onClick={handlePost}
					>
						<p>Post</p>
					</button>
				</div>
			</div>
		</>
	);
}

export default NewListing;

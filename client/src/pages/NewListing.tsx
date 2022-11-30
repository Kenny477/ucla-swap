import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/Listing/ImageUpload";
import { ImageWithPreview, Listing } from "../types";

interface FormErrors {
	title?: string;
	description?: string;
	category?: string;
	price?: string;
	images?: string;
	condition?: string;
}

export const conditions = [
	{
		name: "New",
		description: "Never used with original packaging.",
		rating: 5,
	},
	{
		name: "Like New",
		description: "No visible signs of wear.",
		rating: 4,
	},
	{
		name: "Good",
		description: "Gently used with only minor flaws.",
		rating: 3,
	},
	{
		name: "Fair",
		description: "Used but functional with signs of wear.",
		rating: 2,
	},
	{
		name: "Poor",
		description: "Damaged with flaws that may affect usability.",
		rating: 1,
	},
];

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
		condition: "",
	});
	const [error, setError] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
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
		<div className="col-span-1 row-span-1 aspect-square border border-black bg-black" key={file.preview}>
			<img
				src={file.preview}
				alt={file.name}
				className="h-full w-full object-contain"
				// Revoke data uri after image is loaded
				onLoad={() => {
					URL.revokeObjectURL(file.preview);
				}}
			/>
		</div>
	));

	useEffect(() => {
		const errors = {
			title: title ? "" : "Title is required",
			description: description ? "" : "Description is required",
			price: isFinite(price) ? "" : "Price is required",
			category: categories.includes(category as Listing["category"]) ? "" : "Category is required",
			condition: condition ? "" : "Condition is required",
			images: images.length ? "" : "At least one image is required",
		}
		setErrors(errors);
	}, [title, description, price, category, images, condition, triedSubmit]);

	async function handlePost() {
		setTriedSubmit(true);
		if(Object.values(errors).some((error) => error)) return
		const endpoint = "/api/listing/create";
		const data = {
			title,
			description,
			price,
			category,
			condition,
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

	function addImages(newImages: ImageWithPreview[]) {
		setImages(images => [...images, ...newImages]);
	}

	return (
		<>
			<div className="grid grid-cols-4 bg-primary_lightest px-10 space-y-4 min-h-full gap-4 pb-10">
				<div className="col-span-4 row-span-1 flex flex-row justify-center items-center py-4">
					<h1 className="text-xl">Create Listing</h1>
				</div>
				<div className="col-span-4 col-start-1 row-start-2 row-span-1 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4"><label htmlFor="title">Title</label>
						{errors.title && triedSubmit && (
							<p className="text-red-500 text-sm">{errors.title}</p>
						)}
					</div>
					<input
						type="text"
						id="title"
						name="title"
						className={`w-full rounded-md p-2 ${errors.title && triedSubmit ? "outline outline-red-500" : "focus:outline-none"}`}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="col-span-4 col-start-1 row-start-3 row-span-3 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="description">Description</label>
						{errors.description && triedSubmit && (
							<p className="text-red-500 text-sm">{errors.description}</p>
						)}
					</div>
					<textarea
						name="description"
						id="description"
						className={`resize-none w-full h-full rounded-md p-2 ${errors.description && triedSubmit ? "outline outline-red-500" : "focus:outline-none"}`}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="col-span-4 col-start-1 row-span-1 row-start-6 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="images">Images</label>
						{errors.images && triedSubmit && (
							<p className="text-red-500 text-sm">{errors.images}</p>
						)}
					</div>
					<div className={`bg-white rounded-lg ${errors.images && triedSubmit ? "outline outline-red-500" : "focus:outline-none"}`}>
						<ImageUpload addImages={addImages} />
					</div>
				</div>
				<div className="col-span-4 col-start-1 row-span-1 row-start-7 grid grid-cols-5 gap-2">
					{thumbnails}
				</div>
				<div className="col-span-4 col-start-1 row-start-8 row-span-1 flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="category">Category</label>
						{errors.category && triedSubmit && (
							<p className="text-red-500 text-sm">{errors.category}</p>
						)}
					</div>
					<div
						onClick={() => setShowDropdown(!showDropdown)}
						className={`bg-white p-2 rounded-md flex flex-row justify-between items-center ${errors.description && triedSubmit ? "outline outline-red-500" : "focus:outline-none"}`}
					>
						{category ? category : "Select a category"}
						{showDropdown ? (
							<FaChevronUp />
						) : (
							<FaChevronDown />
						)}
					</div>
					<div>
						{showDropdown &&
							categories.map((c, i) => (
								<div
									key={c}
									className={`p-2 ${c === category ? "bg-slate-200" : "bg-white"
										} border-[0.5px] border-b-slate-200 ${i === categories.length - 1 ? "rounded-b-md" : ""} ${i === 0 ? "rounded-t-md" : ""} shadow-2xl select-none`}
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
				<div className="col-span-1 col-start-1 row-start-9 row-span-1 flex flex-col space-y-2">
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
				<div className="col-span-4 row-span-1 row-start-10">
					<div className="flex flex-row items-center space-x-4">
						<label htmlFor="condition">Condition</label>
						{errors.condition && triedSubmit && (
							<p className="text-red-500 text-sm">{errors.condition}</p>
						)}
					</div>
					<div className="grid grid-cols-5 grid-rows-1 gap-2">
						{conditions.map((c) => (
							<button key={c.rating} type="button" className={`flex flex-col text-left p-2 bg-white rounded-md ${condition === c.rating ? 'outline outline-primary' : ''}`} onClick={() => setCondition(c.rating as 0 | 1 | 2 | 3 | 4 | 5)}>
								{c.name}
								<small>
									{c.description}
								</small>
							</button>
						))}
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

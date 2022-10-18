import React, { useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";

function NewListing() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
  const [cookies, setCookie] = useCookies();

	async function handlePost() {
    const endpoint = '/api/listing/create';
    const data = {
      title,
      description,
    };
    const res = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.access_token}`,
      },
    });
    console.log(res);
  }

	return (
		<div className="grid grid-cols-4 grid-rows-6 bg-primary_lightest px-10 space-y-4">
			<div className="col-span-4 row-span-1 flex flex-row justify-center items-center py-4">
				<h1 className="text-xl">Create Listing</h1>
			</div>
			<div className="col-span-4 row-span-4 flex flex-col space-y-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					className="w-full focus:outline-0 rounded-md p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					className="resize-none w-full h-full focus:outline-none rounded-md p-2"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="col-span-4 row-span-1 flex flex-row justify-end">
				<button
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

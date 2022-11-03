import axios from "axios";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageUpload({
	setShowImageUpload,
}: {
	setShowImageUpload: (showImageUpload: boolean) => void;
}) {
	const [files, setFiles] = useState<(File & { preview: string })[]>([]);

	async function handleUpload() {
		const endpoint = "/api/file";
		const formData = new FormData();
		files.forEach((file) => {
			formData.append("file", file);
		});
		const res = await axios
			.post(endpoint, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res);
				setShowImageUpload(false);
			});
	}

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
	});

	const thumbnails = files.map((file) => (
		<div className="" key={file.name}>
			<div className="">
				<img
					src={file.preview}
					className="h-6"
					// Revoke data uri after image is loaded
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
			</div>
		</div>
	));

	return (
		<div className="absolute left-0 top-0 bg-black/25 h-screen w-screen flex justify-center items-center">
			<div className="bg-white rounded-lg w-1/3 h-1/2 p-4 flex flex-col space-y-2">
				<h1>Upload Image</h1>
				<div
					{...getRootProps({
						className: "border-2 border-dotted grow",
					})}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>
							Drag 'n' drop some files here, or click to select
							files
						</p>
					)}
				</div>
				<aside className="h-10">{thumbnails}</aside>
				<button type="button" className="bg-primary rounded-lg text-white" onClick={handleUpload}>
					Upload
				</button>
			</div>
		</div>
	);
}

export default ImageUpload;

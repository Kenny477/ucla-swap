import axios from "axios";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageWithPreview } from "../../types";

// Allows user to upload image via drag and drop or folder navigation
function ImageUpload({
	addImages,
}: {
	addImages: (images: ImageWithPreview[]) => void;
}) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		addImages(
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

	return (
		<div
			{...getRootProps({
				className: "w-full h-full p-4 flex flex-col space-y-2 items-center"
			})}
		>
			<input {...getInputProps()} />
			<button type="button" className="bg-primary rounded-lg text-white w-1/3 p-2">
				Upload
			</button>
			{isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag 'n' drop some files here, or click to select files</p>
			}
		</div>
	);
}

export default ImageUpload;

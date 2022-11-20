import axios from "axios";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export type ImageWithPreview = File & {
	preview: string;
}

function ImageUpload({
	addImages,
	setShowImageUpload,
}: {
	addImages: (images: ImageWithPreview[]) => void;
	setShowImageUpload: (showImageUpload: boolean) => void;
}) {
	const [files, setFiles] = useState<ImageWithPreview[]>([]);

	function handleUpload() {
		addImages(files);
		setShowImageUpload(false);
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

	return (
		<div
			{...getRootProps({
				className: "bg-white rounded-lg p-4 flex flex-col space-y-2 items-center",
			})}
		>
			<input {...getInputProps()} />
			<button type="button" className="bg-primary rounded-lg text-white w-1/3 p-2" onClick={handleUpload}>
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

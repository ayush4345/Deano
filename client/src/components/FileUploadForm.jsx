"use client"; // Make this component a client component
// components/FileUploadForm.tsx
import React, { useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import classNames from "classnames";

const FileUploadForm = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileSelected = (e) => {
        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!images.length)
            return;

        const formData = new FormData();

        try {
            images.forEach(async (image) => {
                formData.append(image.name, image);
            });

            setUploading(true);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            // handle the error
            if (!res.ok) throw new Error(await res.text());
            setUploading(false);

        }
        catch (e) {
            // Handle errors here
            console.error(e);
        }

    };



    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <CustomFileSelector
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelected}
                />
                <button
                    type="submit"
                    className={classNames({
                        "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
                            true,
                        "disabled pointer-events-none opacity-40": uploading,
                    })}
                    disabled={uploading}
                >
                    Upload
                </button>
            </div>
            <ImagePreview images={images} />
        </form>
    );
};

export default FileUploadForm;

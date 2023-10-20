"use client"; // Make this component a client component
// components/FileUploadForm.tsx
import React, { useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import classNames from "classnames";

const FileUploadForm = ({setCid, setUploadedFiles}) => {
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
            setImages([]);
            console.log("Uploaded Successfully");
            setUploadedFiles(true);
            const json = await res.json();
            console.log(json);
            setCid(json.cid);
        }
        catch (e) {
            // Handle errors here
            console.error(e);
        }

    };



    return (
        <form className="w-full" >
            <div className="flex justify-between">
                <CustomFileSelector
                    accept="image/png, image/jpeg, application/json"
                    onChange={handleFileSelected}
                />
                <button
                    type="button"
                    className={classNames({
                        "bg-slate-50 text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-md":
                            true,
                        "disabled pointer-events-none opacity-40": uploading,
                    })}
                    disabled={uploading}
                    onClick={handleSubmit}
                >
                    Upload
                </button>
            </div>
            <ImagePreview images={images} />
        </form>
    );
};

export default FileUploadForm;

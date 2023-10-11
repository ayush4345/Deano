'use client'
import React, { useState } from "react"
import FileUploadForm from "@/components/FileUploadForm"

export default function CreateJob() {

    const [uploadedFiles, setUploadedFiles] = useState(false)
    const [title, setTitle] = useState("")
    const [bounty, setBounty] = useState(0)
    const [cid, setCid] = useState("")


    return (

        <div className="flex flex-col items-center justify-between p-24 text-black bg-white">
            <h2 className="text-2xl">Create Job</h2>
            <form className="flex flex-col items-center justify-between p-24">
                <label for="title" className="text-xl">Title</label>
                <input type="text" id="title" name="title" className="border border-black" />
                <label for="bounty">Bounty</label>
                <div className="flex flex-row justify-between">
                    <p>0</p>
                    <p>100</p>
                </div>
                <div className="idv">{bounty}</div>
                <input type="range" id="bounty" name="bounty" min={0} max={100} value={bounty} onChange={(e) => setBounty(e.target.value)} />
                {/* <div className="flex flex-col items-center justify-between p-24"> */}
                {
                    uploadedFiles ? (
                        <div className="flex flex-col items-center justify-between p-24 bg-green-600">
                            Files Pinned to IPFS at
                            <a href={`https://dweb.link/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                                {cid}
                            </a>
                        </div>
                    ) : (
                        <FileUploadForm setUploadedFiles={setUploadedFiles} setCid={setCid} />
                    )
                }
                {/* // </div> */}
                <button className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>

            </form>
        </div>


    )


}
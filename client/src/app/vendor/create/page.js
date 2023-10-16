'use client'
import React, { useState } from "react"
import FileUploadForm from "@/components/FileUploadForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CreateJob() {

    const [uploadedFiles, setUploadedFiles] = useState(false)
    const [title, setTitle] = useState("")
    const [bounty, setBounty] = useState(0)
    const [cid, setCid] = useState("")


    return (
        <>
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div className="flex flex-col items-center justify-between p-24 text-black relative z-10">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-violet-900 to-gray-300 inline text-[72px] font-bold">
                    Create new job
                </h1>
                <form className="flex flex-col justify-between w-2/3 h-2/3 p-20 shadow-xl rounded-lg">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your task" />
                    </div>
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
                                <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                                    {cid}
                                </a>
                            </div>
                        ) : (
                            <FileUploadForm setUploadedFiles={setUploadedFiles} setCid={setCid} />
                        )
                    }
                    {uploadedFiles
                        ? <Button >
                            Submit
                        </Button>

                        : <Button disabled>
                            Submit
                        </Button>
                    }

                </form>
            </div>
        </>
    )
}
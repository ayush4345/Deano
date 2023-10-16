'use client'
import React, { useState } from "react"
import FileUploadForm from "@/components/FileUploadForm"
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi as tokenABI } from './../../../abi/Airdrop.json'
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
export default function CreateJob() {

    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState(false)
    const [title, setTitle] = useState("")
    const [hasPaid, setHasPaid] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { address } = useAccount();
    const res = useBalance({
        address: address,
        token: "0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7",
        cacheTime:100000,
    })
    const [bounty, setBounty] = useState(0)
    const [value , setValue] = useState(0)
    const [cid, setCid] = useState("bafybeihi4eb6t32szzhxcp7gxrspwcpviktqy7o7s2qagfnqigd7moicri")
    const { config } = usePrepareContractWrite({
        address: '0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7',
        abi: tokenABI,
        functionName: 'depositBounty',
        args: [bounty],
        cacheTime:100000,
    })


    const { data, isLoading, isSuccess, write } = useContractWrite({
        ...config,
        onSuccess: () => setHasPaid(true),
    })

    const handlePayBounty = (e) => {
        e.preventDefault()
        console.log(bounty)        
        // write?.()
        setHasPaid(true)
    }

    const handleJobSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`http://localhost:3000/api/vendor/${address}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vendor_address: address,
                //convert to int uuid
                job_id: 3,
                status: 1,
                cid: cid,
                bounty: 112,
                type: 2               
            })
        })
        const data = await res.json()
        console.log(data)
        setSubmitting(false)
        // router.push(`/vendor/${address}`)
        router.replace(`/vendor/`)        
    }

    return (

        <div className="flex flex-col items-center justify-between p-24 text-black bg-white">
            <h2 className="text-2xl">Create Job</h2>
            <form 
            onSubmit={handleJobSubmit}
            className="flex flex-col items-center justify-between p-24">
                <label for="title" className="text-xl">Title</label>
                <input type="text" id="title" name="title" className="border border-black" />
                <div className="bounty">
                    {hasPaid ? <div className="flex flex-row justify-between">
                        {bounty}
                    </div> :
                        (
                            <>
                                <label for="bounty">Bounty</label>
                                <div className="flex flex-row justify-between">
                                    {value}
                                </div>
                                <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(e.target.value)} onMouseUp={(e) => setBounty(e.target.value)} className="w-full" />
                                <button
                                    disabled={isLoading}
                                    onClick={handlePayBounty}
                                    className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
                                    {isLoading ? "Paying..." : "Pay Bounty"}
                                </button>
                            </>
                        )}
                </div>


                {
                    uploadedFiles ? (
                        <div className="flex flex-col items-center justify-between p-24 bg-green-600">
                            Files Pinned to IPFS at
                            <a  href={`https://dweb.link/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                                {cid}
                            </a>
                        </div>
                    ) : (
                        <FileUploadForm setUploadedFiles={setUploadedFiles} setCid={setCid} />
                    )
                }
                {/* // </div> */}
                <button                    
                    disabled={submitting}
                    className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
                    {submitting ? "Submitting..." : "Submit Job"}
                </button>

            </form>

            

        </div>


    )


}
'use client'
import React, { useState } from "react"
import FileUploadForm from "@/components/FileUploadForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi as tokenABI } from '@/abi/Payout.json'
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
        cacheTime: 100000,
    })
    const [bounty, setBounty] = useState(0)
    const [value, setValue] = useState(0)
    const [cid, setCid] = useState("bafybeihi4eb6t32szzhxcp7gxrspwcpviktqy7o7s2qagfnqigd7moicri")
    const { config } = usePrepareContractWrite({
        address: '0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7',
        abi: tokenABI,
        functionName: 'depositBounty',
        args: [bounty],
        cacheTime: 100000,
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
                job_id: uuidv4().slice(0, 6),
                status: 'active',
                cid: cid,
                bounty: bounty,
            })
        })
        const data = await res.json()
        console.log(data)
        setSubmitting(false)
        // router.push(`/vendor/${address}`)
        // router.replace(`/vendor/`)
    }

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
                <form
                    onSubmit={handleJobSubmit}
                    className="flex flex-col justify-between w-2/3 h-2/3 p-20 shadow-xl rounded-lg">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your task" />
                    </div>
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
                                <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                                    {cid}
                                </a>
                            </div>
                        ) : (
                            <FileUploadForm setUploadedFiles={setUploadedFiles} setCid={setCid} />
                        )
                    }
                    <button
                        disabled={submitting}
                        className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
                        {submitting ? "Submitting..." : "Submit Job"}
                    </button>

                </form>
            </div>
        </>
    )
}





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
import Token from "@/components/Token"
import { sendNotification } from "../../../utils/notifications"
import { usePrivy, useWallets } from "@privy-io/react-auth";
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateJob() {

    const randomAnnotationJobTitles = [
        "Annotate 100 plant images",
        "Annotate 1000 images of people",
        "Annotate 1000 images of animals",
        "Annotate 1000 images of cars",
        "Annotate 10 images of retina scans",
        "Annotate 1000 images of cats"
    ]

    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState(false)
    const [title, setTitle] = useState(randomAnnotationJobTitles[Math.floor(Math.random() * randomAnnotationJobTitles.length)])
    const { wallets } = useWallets()
    const { ready, authenticated, user, login, logout, signMessage } = usePrivy();

    const Instructions = () => {
        return (
            <div className="bg-orange-200 p-4 rounded-lg mb-4 m-2 shadow-md">
                <h2 className="text-lg font-bold mb-2">Important Instructions to Create a Job</h2>
                <ul className="list-disc list-inside">
                    <li>You can choose Multiple Images.</li>
                    <li>Add <code>labels.json</code> which contains all Labels, and <code>filename.json</code> containing name of the file</li>
                </ul>
            </div>
        );
    }

    const [hasPaid, setHasPaid] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { address } = useAccount();
    const res = useBalance({
        address: wallets[0].address,
        token: "0x6cD23FB64f122705AbeE7305Eef346Bb10175491",
        cacheTime: 100000,
    })
    //set a random bounty
    const [bounty, setBounty] = useState(Math.round(Math.random() * 100))
    const [value, setValue] = useState(bounty)
    const [cid, setCid] = useState("")
    const { config } = usePrepareContractWrite({
        address: '0x6cD23FB64f122705AbeE7305Eef346Bb10175491',
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
        // res.data.formatted string of balance convert to int
        const balance = parseInt(res.data.formatted)
        if (bounty > balance) {
            alert("You don't have enough tokens to pay this bounty");
            return;
        }
        console.log(bounty)
        write?.()
    }

    const handleJobSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const res = await fetch(`https://deano.vercel.app/api/vendor/${wallets[0].address}/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                vendor_address: wallets[0].address,
                job_id: uuidv4().slice(0, 6),
                status: 'active',
                cid: cid,
                bounty: bounty,
            })
        })
        const data = await res.json()
        console.log(data)
        setSubmitting(false)
        sendNotification("A New Job has Arrived!", title)
        // router.push(`/vendor/${address}`)
        alert("submitted successfully");
        router.replace(`/vendor/`)
    }

    return (
        <>
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            {ready
                ? (wallets[0]?.address > 0
                    ? <div className="flex flex-col items-center justify-between p-20 pt-0 text-black relative z-10">
                        <div className="flex justify-between items-center gap-x-4">
                            <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-violet-900 to-gray-300 inline text-[72px] font-bold">
                                Create New Job
                            </h1>
                        </div>
                        <div className="flex">
                            <Instructions />
                            <Token />

                        </div>
                        <section className="flex flex-col items-center w-full">
                            <form
                                onSubmit={handleJobSubmit}
                                className="flex flex-col justify-between w-2/3 h-2/3 p-16 gap-5 shadow-xl rounded-lg">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="font-semibold" htmlFor="name">Name</Label>
                                    <Input
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        id="name" />
                                </div>
                                <div className="bounty">
                                    {hasPaid
                                        ? <div className="flex flex-row justify-between">
                                            Paid Bounty Amount {bounty}
                                        </div>
                                        :
                                        (
                                            <>
                                                <label className="font-semibold" for="bounty">Bounty</label>
                                                <div className="flex flex-row justify-between">
                                                    {value}
                                                </div>
                                                <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(e.target.value)} onMouseUp={(e) => setBounty(e.target.value)} className="w-full" />
                                                <Button
                                                    disabled={isLoading}
                                                    onClick={handlePayBounty}>
                                                    {isLoading ? "Paying..." : "Pay Bounty"}
                                                </Button>
                                            </>
                                        )}
                                </div>
                                <div className="upload flex flex-col space-y-1.5 mb-2">
                                    {
                                        uploadedFiles ? (
                                            <div className="flex flex-col space-y-1.5 text-blue-700">
                                                Files Pinned to IPFS at
                                                <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                                                    {cid}
                                                </a>
                                            </div>
                                        ) : (
                                            <FileUploadForm setUploadedFiles={setUploadedFiles} setCid={setCid} hasPaid={hasPaid} />
                                        )
                                    }
                                </div>
                                <Button
                                    disabled={submitting}
                                >
                                    {submitting ? "Submitting..." : "Submit Job"}
                                </Button>
                            </form>
                        </section>
                    </div>
                    : <div className="h-[75vh] w-screen flex items-center justify-center backdrop-blur-sm"><CircularProgress /></div>
                )
                : <div className="h-[75vh] w-screen flex items-center justify-center backdrop-blur-sm"><CircularProgress /></div>
            }
        </>
    )
}

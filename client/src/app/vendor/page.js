'use client'
import Link from "next/link"
import { Suspense, useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export default function VendorPage() {

    const [vendorDetails, setVendorDetails] = useState({ name: "Loading..." })

    useEffect(() => {
        const getVendorDetails = async () => {
            const res = await fetch("http://localhost:3000/api/vendor/0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7/")
            const data = await res.json()
            console.log(data)
            setVendorDetails(data)
        }
        getVendorDetails()
    }, [])

    const { address } = useAccount();
    const res = useBalance({
        address: address,
        token: "0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7",
    })

    return (
        <main className="flex p-24 flex-col bg-white">

            <div className="profile flex flex-row justify-between">
                <Suspense fallback={<div>Loading...</div>}>
                    <Card className="flex-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                                {vendorDetails.name}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Token />
                </Suspense>
            </div>


            <div className="flex flex-row justify-between">

                <Link href="/vendor/create">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create New Job
                    </button>
                </Link>

            </div>
            <h2 className="text-2xl">

                {vendorDetails.jobs ? vendorDetails.jobs.map((job) => (
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <div className="text-xl font-bold">
                                {job.job_name}
                            </div>
                            <div className="text-sm">
                                {job.status}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl font-bold">
                                {job.bounty}
                            </div>
                            <div className="text-sm">
                                {job.job_type}
                            </div>
                        </div>
                    </div>
                )) : <div>No Jobs</div>}
            </h2>

        </main>
    )
}


export const Token = () => {
    const { address } = useAccount();
    const res = useBalance({
        address: address,
        token: "0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7",
    })
    if (res.isLoading) return <div>Loading...</div>
    if (res.error) return <div>Error: {res.error.message}</div>
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {res.data.symbol} Balance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{
                        //concat to 2 decimal places
                        res.data.formatted.slice(0, -16)
                    } {res.data.symbol}</div>

                    <Button className="m-2">
                        <a href="https://app.uniswap.org/#/swap?inputCurrency=0x158012940D35D9F14C091A6f21DC4F0B2Ce126F7&outputCurrency=MATIC" target="_blank" rel="noopener noreferrer">
                            Get Tokens
                        </a>
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}

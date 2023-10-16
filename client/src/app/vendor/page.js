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
import { getVendorJobs } from "@/tableland/db";
import Token from "@/components/Token"

export default function VendorPage() {

    const [vendorDetails, setVendorDetails] = useState({ name: "Loading..." })
    const [vendorJobs, setVendorJobs] = useState([])
    const [updatingJobs, setUpdatingJobs] = useState(false)

    const updateJobs = async () => {
        setUpdatingJobs(true)
        const jobs = await getVendorJobs(address);
        setVendorJobs(jobs)
        setUpdatingJobs(false)
    }


    useEffect(() => {
        const getVendorDetails = async () => {
            const res = await fetch("http://localhost:3000/api/vendor/0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7/")
            const data = await res.json()
            console.log(data)
            setVendorDetails(data)
        }
        getVendorDetails()
        updateJobs()
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
                    <Button className="m-2">
                        Create Job
                    </Button>
                </Link>
                <Button className="m-2" onClick={updateJobs} disabled={updatingJobs}>
                    {updatingJobs ? "Updating Jobs..." : "Update Jobs"}
                </Button>

            </div>
            <h2 className="text-2xl">

                {vendorJobs ? vendorJobs.map((job, index) => (
                    <div
                        key={index}
                        className="flex flex-row justify-between">
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
                            <div className="text-sm">
                                {job.job_type}
                            </div>
                            <Button className="m-2">
                                Get Results
                            </Button>
                        </div>
                    </div>
                )) : <div>No Jobs</div>}
            </h2>

        </main>
    )
}




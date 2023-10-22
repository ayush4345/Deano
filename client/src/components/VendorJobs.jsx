'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { getVendorJobs } from "@/tableland/db";
import { updateJobStatus } from '../tableland/db';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function VendorJobs({ vendor_address }) {

    const [updatingJobs, setUpdatingJobs] = useState(false)
    const [vendorJobs, setVendorJobs] = useState([])
    const updateJobs = async () => {
        setUpdatingJobs(true)
        const jobs = await getVendorJobs(vendor_address);
        setVendorJobs(jobs)
        setUpdatingJobs(false)
    }

    console.log(vendorJobs)
    console.log(vendor_address)

    useEffect(() => {
        updateJobs()
    }, [])

    return (
        <div className=" w-full pt-16">

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
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>


            <div className="list">
                {vendorJobs ? vendorJobs.map((job, index) => (
                    <div
                        key={index}
                        className="flex items-center flex-row justify-around bg-gray-200 rounded-lg">
                        <div className="name">
                            {job.job_id.slice(0, 6)}
                        </div>
                        <span className="bg-blue-400 rounded-md h-fit p-1">
                            {job.status}
                        </span>

                        <StopButton job_id={job.job_id} status={job.status} updateJobs={updateJobs} />


                    </div>
                )) : <div>No Jobs</div>}
            </div>

            <Link href="/api/vendor/results">
                <Button className="m-2">
                    Get Results
                </Button>
            </Link>
        </div>
    )

}

export const StopButton = ({ job_id, status, updateJobs }) => {
    const [stoppingJob, setStoppingJob] = useState(false)

    const stopJob = async () => {
        setStoppingJob(true)
        const result = await updateJobStatus(job_id, "pending")
        console.log(result)
        updateJobs()
        setStoppingJob(false)
    }

    return (
        <Button
            disabled={stoppingJob || status === "completed"}
            onClick={stopJob}
            className="m-2">

            {
                stoppingJob ? "Stopping Job..." : "Stop Job"
            }

        </Button>
    )
}
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
import { Badge } from "@/components/ui/badge"


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
            <div className="list mt-2">
                <Table>
                    <TableCaption>A list of your annotation jobs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Job ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Bounty (in DAN)</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {vendorJobs ? vendorJobs.map((job, index) => (
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-[100px]">{job.job_id}</TableCell>
                                <TableCell>{job.name}</TableCell>
                                <TableCell>
                                    <Badge className={job.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{job.bounty}</TableCell>
                                <TableCell className="text-right">
                                    <StopButton job_id={job.job_id} status={job.status} updateJobs={updateJobs} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )) : <div>No Jobs</div>}

                </Table>



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
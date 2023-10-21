'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { getVendorJobs } from "@/tableland/db";
import { updateJobStatus } from '../tableland/db';

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

            <div className="list">
                {vendorJobs ? vendorJobs.map((job, index) => (
                    <div
                        key={index}
                        className="flex items-center flex-row justify-around bg-gray-200 rounded-lg">
                        <div className="name">
                            {job.job_id.slice(0, 6)}
                        </div>
                        <div className="status">
                            {job.status}
                        </div>

                        <StopButton job_id={job.job_id} status={job.status} updateJobs={updateJobs} />
                        <Link href={`/api/vendor/results/${job.job_id}`}
                            className='underline text-blue-500'>
                            View Results
                        </Link>


                    </div>
                )) : <div>No Jobs</div>}
            </div>
        </div>
    )

}

export const StopButton = ({ job_id, status , updateJobs}) => {
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
            disabled={stoppingJob || status === "pending"}
            onClick={stopJob}
            className="m-2">

            {
                stoppingJob ? "Stopping Job..." : "Stop Job"
            }

        </Button>
    )
}
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { getVendorJobs } from "@/tableland/db";
import { updateJobStatus } from '../tableland/db';

export default function VendorJobs({ vendor_address }) {

    const [updatingJobs, setUpdatingJobs] = useState(false)
    const [vendorJobs, setVendorJobs] = useState([])
    const [stoppingJob, setStoppingJob] = useState(false)
    const updateJobs = async () => {
        setUpdatingJobs(true)
        const jobs = await getVendorJobs(vendor_address);
        setVendorJobs(jobs)
        setUpdatingJobs(false)
    }

    const stopJob = (job_id, status) => async () => {
        setStoppingJob(true)
        const result = await updateJobStatus(job_id, status)
        console.log(result)
        setStoppingJob(false)
        updateJobs()
    }

    return (
        <div className="">

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
                        className="flex flex-row justify-between">
                        <div className="name">
                            {job.job_id.slice(0, 6)}
                        </div>
                        <div className="status">
                            {job.status}
                        </div>

                        <Button
                            // disabled={stoppingJob || job.status === "pending"}
                            onClick={stopJob(job.job_id, "active")}

                            className="m-2">

                            {
                                stoppingJob ? "Stopping Job..." : "Stop Job"
                            }

                        </Button>
                        <Link href={`/vendor/${job.job_id}/results`}
                            className='underline text-blue-500'>                            
                            View Results
                        </Link>


                    </div>
                )) : <div>No Jobs</div>}
            </div>
        </div>
    )

}
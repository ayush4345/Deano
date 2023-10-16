import { getAllJobs, getVendorJobs } from '@/tableland/db'
import { NextResponse } from 'next/server'

const job = {
    bounty: 112,
    cid: 'bafybeihi4eb6t32szzhxcp7gxrspwcpviktqy7o7s2qagfnqigd7moicri',
    job_id: 3,
    status: 1,
    type: 2,
    vendor_address: '0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7'
}

export async function GET(request, { params }) {
    const vendor_address = params.address

    const jobs = await getVendorJobs(vendor_address);
    console.log(jobs);
    //todo 
    //filter jobs by vendor address

    const vendor_details = {
        name: 'test',
        address: vendor_address,
        jobs: [
            job,
            job,
            job
        ]
    }

    return NextResponse.json(vendor_details)
}

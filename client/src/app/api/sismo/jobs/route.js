import { NextResponse } from "next/server"

const job = {
    vendor_address: '0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7',
    job_id: 1,
    status: 'pending',
    job_type: 'high',
    job_name: 'test',
    cid : 'hdflsdfjlsdjf',
}


export async function GET() {

    //create 10 jobs
    const jobs = []
    for (let i = 0; i < 10; i++) {
        jobs.push(job)
    }
    
    return NextResponse.json(jobs)

}
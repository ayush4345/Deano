import { NextResponse } from 'next/server'


export async function GET(request, { params }) {
    const vendor_address = params.address

    const job = {
        vendor_address: '0x3151D7f15e6cdfEeeA36D0dE4F6Da118f7A757e7',
        job_id: 1,
        status: 'pending',
        job_type: 'high',
        job_name: 'test',
        cid: 'hdflsdfjlsdjf',
    }


    //todo 
    //filter jobs by vendor address

    // const vendor_details = {
    //     name: 'test',
    //     address: vendor_address,
    //     jobs : [
    //         job,
    //         job,
    //         job
    //     ]
    // }

    return NextResponse.json({ id: job.job_id })
}


export async function POST(request) {
    const body = await request.json();
    console.log(body)
    return NextResponse.json({ id: 1 })
}
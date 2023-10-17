import { NextResponse } from 'next/server'
import { createJob } from '../../../../../tableland/db';


export async function POST(request) {
    const body = await request.json();
    const job = {
        vendor_address: body.vendor_address,
        job_id: body.job_id,
        status: body.status,
        cid: body.cid,
        bounty: body.bounty,
    }

    try {
        console.log(job)
        const createHash = await createJob(job);
        return NextResponse.json({
            transactionHash: createHash
        })
    }

    catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
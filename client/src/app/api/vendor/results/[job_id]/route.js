import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    console.log(params)
    const { job_id } = params
    console.log(`Job ID: ${job_id}`)

    return NextResponse.json(
        {
            "job_id": job_id,
            "status": "completed",
            "results": {},
        }

    )

}
import { computeJobResults  , getJobResults, insertAnnotator} from '@/tableland/db'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    console.log(params)
    const { job_id } = params
    console.log(`Job ID: ${job_id}`)

    // const insertHash = await insertAnnotator('0x123')
    // console.log(insertHash)



    // const txHash = await computeJobResults(job_id);

    // console.log(txHash)

    const results = await getJobResults(job_id);

    return NextResponse.json(txHash)

}
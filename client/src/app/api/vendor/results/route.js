import { computeJobResults, getJobResults, insertAnnotator } from '@/tableland/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const results = await getJobResults();
    return NextResponse.json(results)

}
import {getJobResults} from '@/tableland/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const results = await getJobResults();
    console.log(results);
    return NextResponse.json(results)
}
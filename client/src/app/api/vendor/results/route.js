import { computeJobResults, getJobResults} from '@/tableland/db'
import { NextResponse } from 'next/server'
import { db } from '../../../../tableland/connect';

export async function GET() {
    // const results = await getJobResults();
    const { results } = await db.prepare(`SELECT * FROM results_final_80001_7932 LIMIT 100;`).all();
    console.log(results);
    // return results
    return NextResponse.json(results)
}
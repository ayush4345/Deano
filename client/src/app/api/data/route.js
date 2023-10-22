import { NextResponse } from 'next/server'
import { taskSchema } from "../../tasks/data/schema"
import { z } from "zod"
import { db } from '../../../tableland/connect'

export async function GET(req) {

    // const data = await fs.readFile(
    //     path.join(process.cwd(),"src","app","api", "data", "tasks.json")
    // )

    const tableName = `jobs_final2_80001_7898`;
    const { results } = await db.prepare(`SELECT * FROM ${tableName} ;`).all();
    console.log(results);

    // const tasks = JSON.parse(results.toString())

    return NextResponse.json(z.array(taskSchema).parse(results))

}
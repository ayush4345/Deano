import { NextResponse } from 'next/server'
import { promises as fs } from "fs"
import path from "path"
import { taskSchema } from "../../tasks/data/schema"
import { z } from "zod"

export async function GET(req) {

    const data = await fs.readFile(
        path.join(process.cwd(),"src","app","api", "data", "tasks.json")
    )

    const tasks = JSON.parse(data.toString())

    return NextResponse.json(z.array(taskSchema).parse(tasks))

}
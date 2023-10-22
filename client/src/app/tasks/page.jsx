"use client"

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { useEffect,useState } from "react";
import {z} from "zod";
import {taskSchema} from "./data/schema"
import { db } from "@/tableland/connect";

// export const metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// Simulate a database read for tasks.

export default function TaskPage() {

  const [jobData, setJobData] = useState([])

  useEffect(() => {
    const getJobData = async () => {
      const tableName = `jobs_final2_80001_7898`;
      const { results } = await db.prepare(`SELECT * FROM ${tableName} ;`).all();
      console.log(results);
      const response = z.array(taskSchema).parse(results)
      response.filter((item) => item.cid !== "" && item.status === "active")
      setJobData(response)
    }

    getJobData()

  }, [])

  // const response = await fetch("https://deano.vercel.app/api/data");
  // const tasks = [
  //   {
  //     "job_id": "86de88",
  //     "name": "Annotate 8 images of cat",
  //     "vendor_address": "0xEF067A08596D98F480e6FF6eaA7DF650Cf738bFc",
  //     "status": "active",
  //     "bounty": 29,
  //     "cid": "bafybeidykipmptpql33uzy4wv6eh5ych2lnnhvfk22hszlc2x7fyolnyme"
  //   }
  // ]
  // const result = await response.json()

  console.log(jobData)

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of tasks!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={jobData} columns={columns} />
      </div>
    </>
  );
}

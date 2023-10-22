"use client"

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { useEffect,useState } from "react";
import {z} from "zod";
import {taskSchema} from "./data/schema"
import { db } from "@/tableland/connect";
import CircularProgress from '@mui/material/CircularProgress';

export default function TaskPage() {

  const [jobData, setJobData] = useState([])

  useEffect(() => {
    const getJobData = async () => {
      const tableName = `jobs_final2_80001_7898`;
      const { results } = await db.prepare(`SELECT * FROM ${tableName} ;`).all();
      console.log(results);
      const response = z.array(taskSchema).parse(results)
      // response.filter((item) => item.cid !== "" && item.status === "active")
      setJobData(response)
    }

    getJobData()

  }, [])

  console.log(jobData)

  return (
    <>
    {jobData.length > 0
      ?<div className="h-full flex-1 flex-col space-y-8 p-8 flex">
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
      :<div className="h-screen w-screen flex items-center justify-center backdrop-blur-sm"><CircularProgress /></div>
    }
    </>
  );
}

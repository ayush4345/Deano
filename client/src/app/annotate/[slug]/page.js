"use client"

import AnnotationCard from "../card.js"
import { data } from "../card.js"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button.jsx"
import { db } from "@/tableland/connect.js"
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react"
import XMTPChat from '@/components/XMTP/XMTPChat'
import { set } from "zod"
import CircularProgress from '@mui/material/CircularProgress';


export default function CardWithForm({ params }) {

  const value = useSelector((state) => state.annotation.annotation)
  const [jobData, setJobData] = useState([])
  const [images, setImages] = useState([])
  const [filename, setFilename] = useState({ "filenames": [] })
  const [labels, setLabels] = useState({ "labels": [] })
  const [vendorAddress, setVendorAddress] = useState("0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167")

  const { wallets } = useWallets();

  const SubmitHandler = async () => {

    try {
      const valueCopy = [...value]
      valueCopy.sort(function (a, b) { return a.imageId - b.imageId })

      console.log(valueCopy)

      let result = JSON.stringify(valueCopy.map(a => a.label))

      console.log(result)

      const tableName = "answers_final_80001_7894";

      const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (job_id,annotator_id,labels) VALUES (?, ?,?);`)
        .bind(params.slug, wallets[0].address, result)
        .run();

      console.log(insert)
      console.log(insert.txn.transactionHash);
      const res = await insert.txn.wait();
      console.log(res);

    } catch (error) {
      console.log(err)
    }

  }

  useEffect(() => {
    const getJobData = async () => {
      const tableName = `jobs_final2_80001_7898`;
      const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE job_id = '${params.slug}';`).all();
      console.log(results);
      setJobData(results)
    }

    getJobData()

  }, [])

  useEffect(() => {

    const getImages = async () => {
      console.log("fetching info")
      const response = await fetch(`https://ipfs.io/ipfs/${jobData[0].cid}/filename.json`);
      const result = await response.json();
      setFilename(result)

      const response2 = await fetch(`https://ipfs.io/ipfs/${jobData[0].cid}/labels.json`);
      const result2 = await response2.json();
      setLabels(result2)

      console.log("done")
    }

    if (jobData.length > 0) {
      getImages()
    }

  }, [jobData])

  console.log(filename)

  console.log(labels)
  console.log(jobData)

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      {jobData.length > 0 && labels.labels.length > 0 && filename.filenames.length > 0
        ? <div className=" flex relative z-10">
          <div className="mb-10 flex flex-col justify-center px-5">
            <div className=" p-10 pl-8 pr-1 flex gap-7 justify-center items-center relative flex-wrap">
              {
                filename.filenames.map((value, id) => {
                  return (
                    <AnnotationCard id={id} labels={labels.labels} slug={params.slug} image={jobData[0].cid + "/" + value} />
                  )
                })
              }
            </div>
            <Button onClick={() => SubmitHandler()}>Finally Submit Annotations</Button>
          </div>
          <XMTPChat peer="Vendor" peerAddress={jobData[0].vendor_address}></XMTPChat>
        </div>
        : <div className="h-screen w-screen flex items-center justify-center backdrop-blur-sm"><CircularProgress /></div>
      }
    </>
  )
}

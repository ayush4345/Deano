"use client"

import AnnotationCard from "../card.js"
import { data } from "../card.js"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button.jsx"
import { db } from "@/tableland/connect.js"
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";

import XMTPChat from '@/components/XMTP/XMTPChat'

export default function CardWithForm({ params }) {

  const value = useSelector((state) => state.annotation.annotation)

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


  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className=" flex relative z-10">
        <div className="mb-10 flex flex-col justify-center px-5">
          <div className=" p-10 pl-8 pr-1 flex gap-7 justify-center items-center relative flex-wrap">
            {
              data.map((value, id) => {
                return (
                  <AnnotationCard id={id} labels={value.labels} slug={params.slug} />
                )
              })
            }
          </div>
          <Button onClick={() => SubmitHandler()}>Finally Submit Annotations</Button>
        </div>
        <XMTPChat></XMTPChat>
      </div>
    </>
  )
}

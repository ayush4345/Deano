"use client"

import AnnotationCard from "../card.js"
import { data } from "../card.js"
import { useRouter } from "next/navigation.js"
import { useDispatch, useSelector } from "react-redux"

export default function CardWithForm({ params }) {

  console.log(params)
  const value = useSelector((state) => state.annotation.annotation)

  console.log(value)

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-0">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className=" p-16 flex gap-7 justify-center items-center z-10 relative flex-wrap">
        {
          data.map((value) => {
            return (
              <AnnotationCard id={value.id} labels={value.labels} slug={params.slug} />
            )
          })
        }
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import React from 'react'
import { FaCity } from 'react-icons/fa6'

const HGroupPropertyList = ({ isPending }: { isPending: boolean }) => {
  if (isPending) {
    return (
      <div className=" pb-5 border-b-4 border-slate-700 min-w-[1080px] flex items-start justify-between">
      <hgroup className="flex flex-col">
        <h1 className="text-2xl font-bold skeleton rounded-none bg-slate-300 text-transparent w-fit">
          Property List
        </h1>
        <p className="text-sm font-medium skeleton rounded-none bg-slate-300 text-transparent w-fit">
          Effortlessly Manage and Monitor Your Active Properties
        </p>
      </hgroup>
        <div className="skeleton text-transparent bg-gray-200 flex items-center gap-1.5 justify-center disabled:scale-100 disabled:opacity-100 px-5  py-2 text-sm font-bold rounded-full ">
          Add Property
        </div>
    </div>
    )
  }

  return (
    <div className=" pb-5 border-b-4 border-slate-700 min-w-[1080px] flex items-start justify-between">
      <hgroup className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">Property List</h1>
        <p className="text-sm font-medium text-gray-500">
          Effortlessly Manage and Monitor Your Active Properties
        </p>
      </hgroup>
      <Link href='/tenant/property/create'>
        <button disabled={isPending} className="disabled:bg-slate-300 disabled:text-white flex items-center gap-1.5 justify-center disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-2 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 ">
          <FaCity />
          Add Property
        </button>
      </Link>
    </div>
  )
}

export default HGroupPropertyList

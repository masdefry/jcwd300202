'use client'

import React from 'react'

const HGroupPropertyType = ({isPending}: {isPending: boolean}) => {
  if(isPending) {
    return (
      <hgroup className="flex flex-col gap-1 pb-5 border-b-4 border-slate-700 min-w-[1080px]">
        <h1 className="text-2xl font-bold skeleton text-transparent bg-slate-300 rounded-none w-fit">Property Type Management</h1>
        <p className="text-sm font-medium skeleton text-transparent bg-slate-300 rounded-none w-fit">
        Empowering tenants to easily manage and customize their living space
        </p>
      </hgroup>
    )

  }
  return (
    <hgroup className="flex flex-col pb-5 border-b-4 border-slate-700 min-w-[1080px]">
      <h1 className="text-2xl font-bold text-gray-800">Property Type Management</h1>
      <p className="text-sm font-medium text-gray-500">
      Empowering tenants to easily manage and customize their living space
      </p>
    </hgroup>
  )
}

export default HGroupPropertyType

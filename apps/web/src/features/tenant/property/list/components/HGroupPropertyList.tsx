'use client'

import React from 'react'

const HGroupPropertyList = ({ isPending }: { isPending: boolean }) => {
  if(isPending) {

      return (
      <hgroup className="flex flex-col pb-5 border-b-4 gap-1 border-slate-700 min-w-[1080px]">
      <h1 className="text-2xl font-bold skeleton rounded-none bg-slate-300 text-transparent w-fit">Property List</h1>
      <p className="text-sm font-medium skeleton rounded-none bg-slate-300 text-transparent w-fit">
        Effortlessly Manage and Monitor Your Active Properties
      </p>
      </hgroup>
      )
}

return (
<hgroup className="flex flex-col pb-5 border-b-4 border-slate-700 min-w-[1080px]">
<h1 className="text-2xl font-bold text-gray-800">Property List</h1>
<p className="text-sm font-medium text-gray-500">
  Effortlessly Manage and Monitor Your Active Properties
</p>
</hgroup>
)
}

export default HGroupPropertyList

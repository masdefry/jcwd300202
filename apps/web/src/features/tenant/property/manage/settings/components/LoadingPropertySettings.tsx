'use client'

import React from 'react'

const LoadingPropertySettings = ({
  isPendingDeleteProperty,
  isPendingProperty,
}: {
  isPendingDeleteProperty: boolean
  isPendingProperty: boolean
}) => {
  return (
    <main className="flex flex-col gap-5 2xl:p-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold skeleton bg-slate-300 rounded-none w-fit text-transparent">
          Property Settings
        </h1>
        <p className="text-sm font-medium skeleton bg-slate-300 rounded-none w-fit text-transparent">
          Manage your Pan Pacific Jakarta property
        </p>
      </div>
      <section className="flex flex-col gap-4 py-4">
        <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
          <hgroup className="flex flex-col gap-1">
            <h1 className="skeleton bg-slate-300 rounded-none w-fit text-transparent text-medium font-bold">
              Delete Property
            </h1>
            <p className="skeleton bg-slate-300 rounded-none w-fit text-transparent text-xs font-semibold">
              Your Property, Your Control – Delete Anytime, No Questions Asked!
            </p>
          </hgroup>
          <button
            disabled={isPendingProperty || isPendingDeleteProperty}
            className=" flex items-center gap-1.5 text-sm font-bold  rounded-full px-5 py-3 shadow-sm skeleton bg-gray-200 text-transparent"
          >
            00 Delete
          </button>
        </div>
      </section>
    </main>
  )
}

export default LoadingPropertySettings

'use client'

import React from 'react'

const SkeletonLoadingRoomDetails = () => {
  return (
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5 gap-1">
        <h1 className="text-lg font-bold skeleton w-fit bg-slate-300 text-transparent rounded-none">
          Room Details
        </h1>
        <p className="text-sm font-medium skeleton w-fit bg-slate-300 text-transparent rounded-none">
          Easily Manage Your Space: Update Room Details Anytime, Anywhere
        </p>
      </hgroup>
      <section className="flex flex-wrap gap-3 p-5 justify-center">
        {Array.from({ length: 3 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md border border-slate-200"
            >
              <figure className="w-full h-[50%] skeleton bg-gray-200 text-transparent rounded-none relative">
                <p className="absolute w-full bottom-0 left-0 p-3 skeleton bg-gray-400 text-transparent rounded-none font-bold">
                  Premiere Suite
                </p>
              </figure>
              <section className="p-2 flex flex-col justify-between h-[50%] w-full text-sm font-bold text-gray-600">
                <article className="flex flex-col gap-1">
                  <p className="flex items-center gap-1.5 skeleton w-fit bg-slate-300 text-transparent rounded-none">
                    Capacity: 5 guest
                  </p>
                  <p className="flex items-center gap-1.5 skeleton w-fit bg-slate-300 text-transparent rounded-none">
                    Total number this room: 10
                  </p>
                  <p className="flex items-center gap-1.5 skeleton w-fit bg-slate-300 text-transparent rounded-none">
                    Base price: 50000000
                  </p>
                </article>
                <section className="flex gap-1.5">
                  <div className="skeleton w-fit bg-slate-300 text-transparent rounded-full text-sm font-bold px-4 py-1.5">
                    Edit
                  </div>
                  <div className="skeleton w-fit bg-slate-300 text-transparent rounded-full text-base font-bold px-4 py-1.5 flex items-center justify-center">
                    000
                  </div>
                  <div className="skeleton w-fit bg-slate-300 text-transparent rounded-full  text-sm font-bold px-4 py-1.5">
                    Delete
                  </div>
                </section>
              </section>
            </div>
          )
        })}
        <div className="flex flex-col gap-1 items-center justify-center text-lg font-bold h-[350px] w-[250px] rounded-2xl overflow-hidden shadow-md  skeleton  bg-gray-200 text-transparent ">
          <p>Add a new room</p>
        </div>
      </section>
    </main>
  )
}

export default SkeletonLoadingRoomDetails

'use client'

import React from 'react'
import { CiBoxList } from 'react-icons/ci'
import { FaRegStar } from 'react-icons/fa6'
import { RiLoginBoxLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { TbHomeCancel } from 'react-icons/tb'

const TenantPropertiesGeneralInfo = ({ dataProperties, isPending }: {dataProperties: any, isPending: boolean}) => {
    if(isPending) {
        return (
            <section className='min-w-[1080px]'>
              <div className="grid grid-cols-5 rounded-md py-5 shadow-md bg-white border border-slate-100">
                <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
                  
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-sm font-medium skeleton w-fit rounded-none bg-slate-300 text-transparent">Reservation</p>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
                  
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-sm font-medium skeleton w-fit rounded-none bg-slate-300 text-transparent">Arrival</p>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
                 
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-sm font-medium skeleton w-fit rounded-none bg-slate-300 text-transparent">Departure</p>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
                  
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-sm font-medium skeleton w-fit rounded-none bg-slate-300 text-transparent">Review</p>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start px-5">
                 
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-xl font-bold skeleton w-fit rounded-none bg-slate-300 text-transparent">1000</p>
                  <p className="text-sm font-medium skeleton w-fit rounded-none bg-slate-300 text-transparent">Cancellation</p>
                </div>
              </div>
            </section>
        )
    }
  return (
      <section className='min-w-[1080px]'>
        <div className="grid grid-cols-5 rounded-md py-5 shadow-md bg-white border border-slate-100">
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <CiBoxList size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">{dataProperties?.reservation}</p>
            <p className="text-sm font-medium text-blue-700">Reservation</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <RiLoginBoxLine
              size={23}
              className="text-gray-600 ml-[-4px] mb-2"
            />
            <p className="text-xl font-bold text-gray-800">{dataProperties?.arrival}</p>
            <p className="text-sm font-medium text-blue-700">Arrival</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <RiLogoutBoxRLine
              size={23}
              className="text-gray-600 ml-[-4px] mb-2"
            />
            <p className="text-xl font-bold text-gray-800">{dataProperties?.departure}</p>
            <p className="text-sm font-medium text-blue-700">Departure</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start border-r border-slate-300 px-5">
            <FaRegStar size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">{dataProperties?.totalReview}</p>
            <p className="text-sm font-medium text-blue-700">Review</p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start px-5">
            <TbHomeCancel size={23} className="text-gray-600 ml-[-4px] mb-2" />
            <p className="text-xl font-bold text-gray-800">{dataProperties?.cancellation}</p>
            <p className="text-sm font-medium text-blue-700">Cancellation</p>
          </div>
        </div>
      </section>
  )
}

export default TenantPropertiesGeneralInfo

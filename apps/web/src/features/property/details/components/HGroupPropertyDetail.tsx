'use client'

import React from 'react'
import { CiLocationOn, CiSignpostR1 } from 'react-icons/ci'

const HGroupPropertyDetail = ({ dataPropertyDetail, isPending }: any) => {
    if(isPending) {
        return (
                 <hgroup className='flex flex-col leading-3 gap-1 2xl:gap-2 2xl:p-0 px-5 '>
                     <h1 className='text-lg lg:text-xl 2xl:text-4xl font-bold tracking-wide text-transparent w-fit skeleton bg-slate-300 rounded-none'>Pan Pacific Jakarta</h1>
                     <p className='text-sm 2xl:text-base font-medium text-transparent w-fit skeleton bg-slate-300 rounded-none flex items-center gap-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                     <p className='text-xs 2xl:text-sm font-medium 2xl:font-light text-transparent w-fit skeleton bg-slate-300 rounded-none flex items-center gap-2'>qqq Zip Code: 12345</p>
                 </hgroup>
        )
    }

  return (
           <hgroup className='flex flex-col leading-3 2xl:gap-2 2xl:p-0 px-5 '>
               <h1 className='text-lg lg:text-xl 2xl:text-4xl font-bold tracking-wide text-gray-900'>{dataPropertyDetail?.property?.name}</h1>
               <p className='text-sm 2xl:text-base font-medium text-gray-700 flex items-center gap-2'><CiLocationOn size={23} className='text-red-600 md:flex hidden' />{dataPropertyDetail?.property?.address}</p>
               <p className='text-xs 2xl:text-sm font-medium 2xl:font-light text-gray-600 flex items-center gap-2'><CiSignpostR1 size={23} className='text-gray-600 md:flex hidden' />Zip Code: {dataPropertyDetail?.property?.zipCode}</p>
           </hgroup>
  )
}

export default HGroupPropertyDetail

'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaRegBuilding, FaRegCalendarDays, FaRegComments, FaWifi } from 'react-icons/fa6'
import { TbFileDescription } from 'react-icons/tb'
import { MdOutlineBedroomParent, MdOutlinePhotoLibrary, MdOutlineRoomService } from 'react-icons/md'
import { IoStatsChart } from 'react-icons/io5'

const TenantManagePropertyLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <main className="flex flex-col">
      <nav className='flex items-center bg-gray-900 text-white rounded-lg w-full overflow-hidden justify-evenly'>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/general-info`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaRegBuilding className='text-2xl' />
            General Info
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/calendar`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
            <FaRegCalendarDays className='text-2xl'/>
              Season Calendar
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/descriptions`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
          <TbFileDescription className='text-2xl' />  
              Descriptions
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/photos`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
          <MdOutlinePhotoLibrary className='text-2xl' />  
              Photos
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/room-details`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <MdOutlineBedroomParent className='text-2xl' />
            Room Details
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/facilities`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaWifi className='text-2xl' />
            Facility & Service
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/room-amenities`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <MdOutlineRoomService className='text-2xl' />
            Room Amenities
        </div>
        </Link>
        <Link href={`#`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaRegComments className='text-2xl' />
            Reviews
        </div>
        </Link>
        <Link href={`#`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center hover:border-white hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <IoStatsChart className='text-2xl' />
            Property Statistic
        </div>
        </Link>
      </nav>
      {children}
    </main>
  )
}

export default TenantManagePropertyLayout

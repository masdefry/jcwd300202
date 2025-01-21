'use client'

import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaRegBuilding, FaRegCalendarDays, FaRegComments, FaWifi } from 'react-icons/fa6'
import { TbFileDescription, TbListDetails } from 'react-icons/tb'
import { MdOutlineBedroomParent, MdOutlinePhotoLibrary, MdOutlineRoomService } from 'react-icons/md'
import { IoClose, IoSettingsOutline, IoStatsChart } from 'react-icons/io5'
import { CiMenuBurger } from 'react-icons/ci'
import { IoIosArrowForward } from 'react-icons/io'

const TenantManagePropertyLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [ showMobileNav, setShowMobileNav ] = useState(false)

  return (
    <main className="flex flex-col relative">
      <section className={` items-start z-50 2xl:static fixed   ${showMobileNav ? 'flex p-5 top-7' : 'hidden 2xl:flex top-10'} left-0 gap-1 transition duration-200 min-h-max`}>
      <nav className='flex 2xl:flex-row flex-wrap 2xl:gap-0 gap-3 items-center 2xl:bg-opacity-100 bg-opacity-95 backdrop-blur-lg bg-gray-900 text-white rounded-lg w-fit 2xl:w-full overflow-hidden justify-center 2xl:justify-evenly'>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <TbListDetails className='text-2xl' />
            Property Details
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/general-info`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaRegBuilding className='text-2xl' />
            General Info
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/calendar`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
            <FaRegCalendarDays className='text-2xl'/>
              Season Calendar
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/descriptions`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
          <TbFileDescription className='text-2xl' />  
              Descriptions
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/photos`}>
          <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
          <MdOutlinePhotoLibrary className='text-2xl' />  
              Photos
          </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/room-details`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <MdOutlineBedroomParent className='text-2xl' />
            Room Details
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/facilities`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaWifi className='text-2xl' />
            Facility & Service
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/room-amenities`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <MdOutlineRoomService className='text-2xl' />
            Room Amenities
        </div>
        </Link>
        <Link href={`#`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <FaRegComments className='text-2xl' />
            Reviews
        </div>
        </Link>
        <Link href={`#`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <IoStatsChart className='text-2xl' />
            Property Statistic
        </div>
        </Link>
        <Link href={`/tenant/property/manage/${pathname.split('/')[4]}/settings`}>
        <div className='text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <IoSettingsOutline className='text-2xl' />
            Settings
        </div>
        </Link>
        <div onClick={() => setShowMobileNav(false)} className='2xl:hidden text-[10px] font-base flex flex-col gap-1.5 p-4 items-center justify-center 2xl:hover:border-white hover:scale-90 2xl:hover:scale-105 active:opacity-75 transition duration-100 border-b-4 border-transparent'>
        <IoClose className='text-2xl' />
            Close
        </div>
      </nav>
      </section>
      {
        !showMobileNav && (
        <div onClick={() => setShowMobileNav(true)} className='fixed top-24 left-0 z-30 rounded-r-md text-white p-2 py-7 pr-[2px] 2xl:hidden bg-gray-900 opacity-75 hover:cursor-pointer active:scale-95 transition duration-100'>
        <CiMenuBurger size={15} />
        </div>
        )
      }
      {children}
    </main>
  )
}

export default TenantManagePropertyLayout

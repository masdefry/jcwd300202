'use client'

import Separator from '@/features/auth/components/Separator'
import { differenceInDays } from 'date-fns'
import { difference } from 'next/dist/build/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsBuildings } from 'react-icons/bs'
import { CgUnavailable } from 'react-icons/cg'
import { CiBookmarkPlus, CiLocationOn } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { RiBuilding3Line } from 'react-icons/ri'

const CardForNotFound = () => {

  return (
    <div className="justify-center items-center bg-white w-full h-fit 2xl:h-[15rem] rounded-lg flex gap-1.5 shadow-md border border-slate-200">
      <IoIosSearch className='text-gray-300' size={45}/>
      <p className='text-slate-300 text-lg font-bold'>Oops! The property you're looking for doesn't exist. Let’s find something else!</p>
    </div>
  )
}

export default CardForNotFound

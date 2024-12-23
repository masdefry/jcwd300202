'use client'

import React, { ReactNode } from 'react'
import { MdOutlineManageAccounts, MdVerified } from 'react-icons/md'
import { GrNotes } from "react-icons/gr";
import { FaRegListAlt } from 'react-icons/fa';
import { TbNotification } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

const ProfileUserLayout = ({  children }: { children: ReactNode }) => {
  return (
    <main className='w-full min-h-min py-5'>
      <section className='m-auto max-w-screen-xl grid grid-cols-4  gap-5 w-full h-full'>
        <section className='col-span-1 bg-white shadow-md rounded-md h-fit'>
          <div>
            <section className='border-b border-slate-300 flex flex-col gap-3 p-5'>
              <div className='flex items-center gap-5'>
                <figure className='rounded-full h-16 w-16 bg-blue-300 border-2 border-slate-200 shadow-md'>

                </figure>
                <hgroup className='flex flex-col'>
                  <h1 className='text-base font-bold text-gray-800'>Muhamad Fauzi Aviawan</h1>
                  <div className='flex items-center gap-2 text-xs font-semibold text-gray-400'>
                    <MdVerified className='text-blue-600' size={13}/>
                    <p>Verified</p>
                  </div>
                  <p className='text-sm font-normal text-gray-400'>Google</p>
                </hgroup>
              </div>
              <div className='rounded-md px-5 py-3 text-white bg-gray-900 text-sm font-bold flex items-center gap-2'>
              <p>Rent Smarter, Live Better.</p>
              </div>
            </section>
            <section className='border-b border-slate-300 flex flex-col p-5'>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <MdOutlineManageAccounts size={20} className='text-blue-400'/>
                Account
              </div>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <GrNotes size={20} className='text-blue-400'/>
                My Order
              </div>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <FaRegListAlt size={20} className='text-blue-400'/>
                Purchase List
              </div>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <TbNotification size={20} className='text-blue-400'/>
                Notification
              </div>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <IoSettingsOutline size={20} className='text-blue-400'/>
                Settings
              </div>
              <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <IoMdLogOut size={20} className='text-red-600'/>
                Sign Out
              </div>
            </section>
          </div>
        </section>
        <section className='col-span-3 rounded-md border border-slate-300 p-5'>
          {children}
        </section>
      </section>
    </main>
  )
}

export default ProfileUserLayout

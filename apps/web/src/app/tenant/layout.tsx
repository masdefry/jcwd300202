'use client'

import Link from 'next/link';
import React, { ReactNode, useState } from 'react'
import { MdOutlineManageAccounts, MdVerified } from 'react-icons/md'
import { GrNotes } from "react-icons/gr";
import { FaRegListAlt } from 'react-icons/fa';
import { TbNotification } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

const ProfileUserLayout = ({  children }: { children: ReactNode }) => {
  // {
  //     title: "Profile",
  //     list: [
  //     {
  //       title: "My Profile",
  //       url: "#",
  //       icon: <IoPersonOutline size={23}/>
  //     },
  //     {
  //       title: "Edit Profile",
  //       url: "#",
  //       icon: <CiEdit size={23}/>
  //     },
  //     {
  //       title: "Logout",
  //       url: "#",
  //       icon: <IoMdLogOut size={23}/>
  //     },
  //   ]
  // },
  // {
  //   title: "Property Management", 
  //   list: [
  //     {
  //       title: "Property List",
  //       url: "#",
  //       icon: <MdOutlineHomeWork size={23}/>
  //     },
  //     {
  //       title: "Add Property",
  //       url: "#",
  //       icon: <TbHomePlus size={23}/>
  //     }
  //   ]
  //   },
  //   {
  //     title: "Transactions", 
  //     list: [
  //     {
  //       title: "Balance",
  //       url: "#",
  //       icon: <MdBalance size={23}/>
  //     },
  //     {
  //       title: "Statistic",
  //       url: "#",
  //       icon: <IoIosTrendingUp size={23}/>
  //     }
  //   ]
  //   }
  const [ menus, setMenus] = useState([
      {
        link: '/tenant/profile',
        title: 'Account',
        icon: <MdOutlineManageAccounts size={20} className='text-blue-400'/>
      },
      {
        link: '#',
        title: 'Property List',
        icon: <GrNotes size={20} className='text-blue-400'/>
      },
      {
        link: '#',
        title: 'Statistic',
        icon: <FaRegListAlt size={20} className='text-blue-400'/>
      },
      {
        link: '#',
        title: 'Notification',
        icon: <TbNotification size={20} className='text-blue-400'/>
      },
      {
        link: '/tenant/settings',
        title: 'Settings',
        icon: <IoSettingsOutline size={20} className='text-blue-400'/>
      }
    ])

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
                  <h1 className='text-base font-bold text-gray-800'>PT Homing Indonesia</h1>
                  <div className='flex items-center gap-2 text-xs font-semibold text-gray-400'>
                    <MdVerified className='text-blue-600' size={13}/>
                    <p>Verified</p>
                  </div>
                  <p className='text-sm font-bold text-gray-500'>Hi, Sharon!</p>
                </hgroup>
              </div>
              <div className='rounded-md px-5 py-3 text-white bg-blue-800 text-sm font-bold flex items-center gap-2'>
              <p>Your Rental, Our Priority.</p>
              </div>
            </section>
            <section className='border-b border-slate-300 flex flex-col p-5'>
            {
              menus.map((item: any, index: number) => {
                return (
              <Link key={index} href={item.link}>
                <div className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                  {item.icon}
                  {item.title}
                </div>
              </Link>
                )
              })
            }
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

'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { MdOutlineManageAccounts, MdVerified } from 'react-icons/md'
import { GrNotes } from "react-icons/gr";
import { FaRegListAlt } from 'react-icons/fa';
import { TbNotification } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';
import { IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import authStore from '@/zustand/authStore';
import { RiBuilding3Fill, RiCloseCircleFill } from 'react-icons/ri';
import Image from 'next/image';

const ProfileUserLayout = ({  children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const profilePictureUrl = authStore(state => state.profilePictureUrl)  
  const username = authStore(state => state.username)  
  const role = authStore(state => state.role)  
  const token = authStore(state => state.token)  
  const isVerified = authStore(state => state.isVerified)  
  const companyName = authStore(state => state.companyName)  
  const setLogout = authStore(state => state.setLogout)
  const router = useRouter()
  const [ showConfirmationToLogout, setShowConfirmationToLogout ] = useState(false)
  
  const menus = [
    {
      link: '/user/profile',
      title: 'Account',
      icon: <MdOutlineManageAccounts size={20} className='text-blue-400'/>
    },
    {
      link: '#',
      title: 'My Order',
      icon: <GrNotes size={20} className='text-blue-400'/>
    },
    {
      link: '#',
      title: 'Purchase List',
      icon: <FaRegListAlt size={20} className='text-blue-400'/>
    },
    {
      link: '#',
      title: 'Notification',
      icon: <TbNotification size={20} className='text-blue-400'/>
    },
    {
      link: '/user/settings',
      title: 'Settings',
      icon: <IoSettingsOutline size={20} className='text-blue-400'/>
    }
    ]

  if(pathname.includes('/auth') || pathname.includes('/tenant/property/create')) {
    return (
        <main className='w-full min-h-min py-5'>
          <section className='m-auto max-w-screen-xl w-full h-full'>
            {children}
          </section>
        </main>
      )
    }


  return (
    <main className='w-full min-h-min pb-5'>
      <section className=' flex flex-col gap-5 w-full h-full'>
        <nav className='bg-slate-200 w-full shadow-md flex flex-col'>
          <div className='bg-white shadow-md'>
            <section className=" max-w-screen-xl px-5 m-auto hidden lg:flex justify-between items-center w-full h-full">
              <div className="flex items-center">
                  <div className="flex items-center gap-1.5 rounded-full p-1 px-2 text-slate-800">
                    <RiBuilding3Fill className="" size={30}/>
                    <p className="text-xs font-bold ">Roomify Inc.</p>
                  </div>
              </div>
              <nav className="text-base font-medium py-5 text-slate-900">
                <ul className="flex gap-8 items-center">
                  {
                    token && (
                      <li><IoLogOutOutline onClick={() => setShowConfirmationToLogout(true)} size={23} className="text-red-700 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100"/></li>
                    )
                  }
                  {
                    role === 'TENANT' && (
                      <Link href='/tenant/property/create'>
                        <li className="border-b-2 border-transparent hover:border-slate-900 hover:cursor-pointer text-sm font-bold active:scale-90 transition duration-200">Add your property</li>
                      </Link>
                    )
                  }
                  <div className={`${showConfirmationToLogout ? 'flex' : 'hidden'} items-center justify-center fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full top-0 left-0 z-[51]`}>
                    <div className='bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5'>
                      <h1 className='text-lg font-bold text-slate-800 pb-2 border-b border-slate-300'>
                      Log Out Confirmation
                      </h1>
                      <article className='text-sm font-medium text-gray-500'>
                      Are you sure you want to log out?
                      </article>
                      <div className='flex items-center justify-end gap-2'>
                        <button type='button' onClick={() => {
                          setShowConfirmationToLogout(false)
                          }} className='px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100'>No, Stay Logged In</button>
                        <button type='button' 
                        onClick={() => {
                        setShowConfirmationToLogout(false)
                        setLogout()
                        router.push('/')
                        }} 
                        className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100'>Yes, Log Me Out</button>
                      </div>
                    </div>
                  </div>
                  {
                    token ? (
                      <Link href={role === 'TENANT' ? '/tenant/profile' : '/user/profile'}>
                        <figure className="rounded-full h-10 w-10 border-2 border-green-400 bg-blue-200 overflow-hidden flex items-center justify-center">
                          {
                          profilePictureUrl ? (
                            <Image
                            src={profilePictureUrl}
                            alt=''
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                            />
                          ) : (
                            <IoPersonOutline size={24} className='text-white'/>
                          )
                          }
                        </figure>
                      </Link>
                    ) : (
                    <Link href='/auth'>
                      <li className="text-sm font-bold rounded-full bg-white text-gray-800 px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Sign in or create account</li>
                    </Link>
                    ) 
                  }
                </ul>
              </nav>
            </section>
          </div>
          <div className=' max-w-screen-xl m-auto flex items-center justify-start w-full py-2'>
            {
              menus.map((item, index) => {
                return (
                <Link href={item.link}>
                  <div className='border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100'> 
                    <p>{item.title}</p>
                  </div>
                </Link>
                )
              })
            }
          </div>

        </nav>
        {/* <section className='col-span-1 bg-white shadow-md rounded-md h-fit'>
          <div>
            <section className='border-b border-slate-300 flex flex-col gap-3 p-5'>
              <div className='flex items-center gap-5'>
                <figure className='rounded-full h-16 w-16 bg-blue-300 border-2 border-green-500 shadow-md overflow-hidden'>
                <Image 
                src={profilePictureUrl}
                width={100}
                height={100}
                alt=''
                className='w-full h-full object-cover'
                />
                </figure>
                <hgroup className='flex flex-col'>
                  <h1 className='text-base font-bold text-gray-800'>{companyName || 'Roomify`s partner'}</h1>
                    {
                      isVerified ? (
                        <div className='flex items-center gap-2 text-xs font-semibold text-gray-400'>
                          <MdVerified className='text-blue-600' size={13}/>
                          <p>Verified</p>
                        </div>
                        ) : (
                        <div className='flex items-center gap-2 text-xs font-semibold text-gray-400'>
                          <RiCloseCircleFill className='text-red-600' size={13}/>
                          <p>Not Verified</p>
                        </div>
                        )
                    }
                  <p className='text-sm font-bold text-gray-500'>Hi, {username}!</p>
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
              <div onClick={() => setShowConfirmationToLogout(true)} className='text-base font-semibold text-gray-800 transition duration-100 px-5 py-3 flex items-center gap-2 rounded-md hover:cursor-pointer hover:bg-slate-200'>
                <IoMdLogOut size={20} className='text-red-600'/>
                Sign Out
                  <div className={`${showConfirmationToLogout ? 'flex' : 'hidden'} items-center justify-center fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full top-0 left-0 z-[51]`}>
                    <div className='bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5'>
                      <h1 className='text-lg font-bold text-slate-800 pb-2 border-b border-slate-300'>
                      Log Out Confirmation
                      </h1>
                      <article className='text-sm font-medium text-gray-500'>
                      Are you sure you want to log out?
                      </article>
                      <div className='flex items-center justify-end gap-2'>
                        <button type='button' onClick={() => {
                          setShowConfirmationToLogout(false)
                          }} className='px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100'>No, Stay Logged In</button>
                        <button type='button' 
                        onClick={() => {
                        setShowConfirmationToLogout(false)
                        setLogout()
                        router.push('/')
                        }} 
                        className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100'>Yes, Log Me Out</button>
                      </div>
                    </div>
                  </div>
              </div>
            </section>
          </div>
        </section> */}
        <section className='w-screen max-w-screen-xl px-5 m-auto rounded-md overflow-hidden bg-white'>
          {children}
        </section>
      </section>
    </main>
  )
}
export default ProfileUserLayout

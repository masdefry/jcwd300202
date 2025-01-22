'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { MdOutlineManageAccounts, MdVerified } from 'react-icons/md'
import { GrNotes } from 'react-icons/gr'
import { FaRegListAlt } from 'react-icons/fa'
import { TbNotification } from 'react-icons/tb'
import { IoMdLogOut } from 'react-icons/io'
import {
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import authStore from '@/zustand/authStore'
import { RiBuilding3Fill, RiCloseCircleFill } from 'react-icons/ri'
import Image from 'next/image'
import useHamburgerMenuHook from '@/hooks/useHamburgerMenuHook'
import Cookies from 'js-cookie'

const ProfileUserLayout = ({ children }: { children: ReactNode }) => {
  const {
    toggleHamburger,
    showHamburgerNav,
    hamburgerMenuActive,
    setHamburgerMenuActive,
  } = useHamburgerMenuHook()
  const pathname = usePathname()
  const profilePictureUrl = authStore((state) => state.profilePictureUrl)
  const username = authStore((state) => state.username)
  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  const isVerified = authStore((state) => state.isVerified)
  const companyName = authStore((state) => state.companyName)
  const setLogout = authStore((state) => state.setLogout)
  const router = useRouter()
  const [showConfirmationToLogout, setShowConfirmationToLogout] =
    useState(false)

  const menus = [
    {
      link: '/user/profile',
      title: 'Account',
      icon: <MdOutlineManageAccounts size={20} className="text-blue-400" />,
    },
    {
      link: '#',
      title: 'My Order',
      icon: <GrNotes size={20} className="text-blue-400" />,
    },
    {
      link: '#',
      title: 'Purchase List',
      icon: <FaRegListAlt size={20} className="text-blue-400" />,
    },
    {
      link: '#',
      title: 'Notification',
      icon: <TbNotification size={20} className="text-blue-400" />,
    },
    {
      link: '/user/settings',
      title: 'Settings',
      icon: <IoSettingsOutline size={20} className="text-blue-400" />,
    },
  ]

  if (
    pathname.includes('/auth') ||
    pathname.includes('/tenant/property/create')
  ) {
    return (
      <main className="w-full min-h-min py-5">
        <section className="m-auto max-w-screen-xl w-full h-full">
          {children}
        </section>
      </main>
    )
  }

  return (
    <main className="w-full min-h-min pb-5">
      <section className=" flex flex-col gap-5 w-full h-full">
        <nav className="bg-slate-200 w-full shadow-md flex flex-col">
          <div className="bg-white shadow-md">
            <section className=" max-w-screen-xl px-5 m-auto flex justify-between items-center w-full h-full">
              <div className="flex items-center">
                <div
                  onClick={toggleHamburger}
                  className={`flex p-2 flex-col gap-[5.5px] 2xl:hidden ${hamburgerMenuActive}`}
                >
                  <div className="h-[1.5px] bg-gray-900 w-[20px] origin-top-left transition duration-300 ease-in-out rounded-full"></div>
                  <div className="h-[1.5px] bg-gray-900 w-[20px] transition duration-300 ease-in-out rounded-full"></div>
                  <div className="h-[1.5px] bg-gray-900 w-[20px] origin-top-left transition duration-300 ease-in-out rounded-full"></div>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 rounded-full p-1 px-2  py-5 text-slate-800"
                >
                  <RiBuilding3Fill className="" size={30} />
                  <p className="text-xs font-bold ">Roomify Inc.</p>
                </Link>
              </div>
              <nav className="text-base font-medium py-5 text-slate-900">
                <ul className="flex gap-8 items-center">
                  {role === 'TENANT' && (
                    <Link href="/tenant/property/create">
                      <li className="border-b-2 border-transparent hover:border-slate-900 hover:cursor-pointer text-sm font-bold active:scale-90 transition duration-200">
                        Add your property
                      </li>
                    </Link>
                  )}

                  {token && (
                    <Link
                      href={
                        role === 'TENANT' ? '/tenant/profile' : '/user/profile'
                      }
                    >
                      <figure className="rounded-full h-10 w-10 border-2 border-green-400 bg-blue-200 overflow-hidden flex items-center justify-center">
                        {profilePictureUrl ? (
                          <Image
                            src={profilePictureUrl}
                            alt=""
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IoPersonOutline size={24} className="text-white" />
                        )}
                      </figure>
                    </Link>
                  )}
                </ul>
              </nav>
            </section>
          </div>
          <div className=" max-w-screen-xl m-auto hidden 2xl:flex items-center justify-start w-full py-2">
            {menus.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <div className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100">
                    <p>{item.title}</p>
                  </div>
                </Link>
              )
            })}
            {
              token && (
                <div
                onClick={() => setShowConfirmationToLogout(true)}
                className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100"
              >
                <p>Sign out</p>
              </div>
              )
            }
          </div>
          <nav
            className={`2xl:hidden origin-top ${showHamburgerNav} transition duration-300 ease-in absolute left-0  top-[77px] bg-white border-b border-slate-200 shadow-md w-full h-fit z-50`}
          >
            {menus.map((item, index) => {
              return (
                <Link key={index} href={item.link}>
                  <div className="p-5 px-7 border-b border-slate-300 text-sm font-semibold text-gray-800">
                    {item.title}
                  </div>
                </Link>
              )
            })}
            {token ? (
              <div
                onClick={() => setShowConfirmationToLogout(true)}
                className="p-5 px-7 border-b border-slate-300 text-sm font-semibold text-gray-800"
              >
                <p>Sign out</p>
              </div>
            ) : (
              <Link href="/auth">
                <div className="p-5 px-7 border-b border-slate-300 text-sm font-semibold text-gray-800">
                  <p>Sign in or create account</p>
                </div>
              </Link>
            )}
          </nav>
        </nav>
        <div
          className={`${showConfirmationToLogout ? 'flex' : 'hidden'} p-5 items-center justify-center fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full top-0 left-0 z-[51]`}
        >
          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
            <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
              Log Out Confirmation
            </h1>
            <article className="text-sm font-medium text-gray-500">
              Are you sure you want to log out?
            </article>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmationToLogout(false)
                }}
                className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100"
              >
                No, Stay Logged In
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmationToLogout(false)
                  setLogout()
                  Cookies.remove('authToken')
                  Cookies.remove('authRole')
                  window.location.href = '/'
                }}
                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100"
              >
                Yes, Log Me Out
              </button>
            </div>
          </div>
        </div>
        <section className="w-screen max-w-screen-xl px-5 m-auto rounded-md overflow-hidden bg-white">
          {children}
        </section>
      </section>
    </main>
  )
}
export default ProfileUserLayout


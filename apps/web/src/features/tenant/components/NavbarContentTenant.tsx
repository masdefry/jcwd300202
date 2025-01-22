'use client'

import Link from 'next/link'
import React from 'react'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { GrNotes } from 'react-icons/gr'
import { FaRegListAlt } from 'react-icons/fa'
import { TbNotification } from 'react-icons/tb'
import { IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import Image from 'next/image'
import { RiBuilding3Fill } from 'react-icons/ri'
import authStore from '@/zustand/authStore'
const NavbarContentTenant = ({
  toggleHamburger,
  hamburgerMenuActive,
  setShowConfirmationToLogout,
  showHamburgerNav,
}: {
    toggleHamburger: any,
    hamburgerMenuActive: any,
    setShowConfirmationToLogout: any,
    showHamburgerNav: string | null,
}) => {
  const profilePictureUrl = authStore((state) => state.profilePictureUrl)
  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  const menus = [
    {
      link: '/tenant/profile',
      title: 'Account',
      icon: <MdOutlineManageAccounts size={20} className="text-blue-400" />,
    },
    {
      link: '/tenant/property/list',
      title: 'Property List',
      icon: <GrNotes size={20} className="text-blue-400" />,
    },
    {
      link: '/tenant/property-type',
      title: 'Property Types',
      icon: <GrNotes size={20} className="text-blue-400" />,
    },
    {
      link: '#',
      title: 'Statistic',
      icon: <FaRegListAlt size={20} className="text-blue-400" />,
    },
    {
      link: '#',
      title: 'Notification',
      icon: <TbNotification size={20} className="text-blue-400" />,
    },
    {
      link: '/tenant/settings',
      title: 'Settings',
      icon: <IoSettingsOutline size={20} className="text-blue-400" />,
    },
  ]
  return (
    <nav className="bg-slate-200 w-full shadow-md flex flex-col">
      <div className="bg-white shadow-md">
        <section className=" max-w-screen-xl px-5 m-auto flex justify-between items-center w-full h-full">
          <div className="flex items-center py-5">
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
              className="flex items-center gap-1.5 rounded-full p-1 px-2 text-slate-800"
            >
              <RiBuilding3Fill className="" size={30} />
              <p className="text-xs font-bold ">Roomify Inc.</p>
            </Link>
          </div>
          <nav className="text-base font-medium py-5 text-slate-900">
            <ul className="flex gap-8 items-center">
              {role === 'TENANT' && (
                <Link
                  href="/tenant/property/create"
                  className="2xl:flex hidden"
                >
                  <li className="border-b-2 border-transparent hover:border-slate-900 hover:cursor-pointer text-sm font-bold active:scale-90 transition duration-200">
                    Add property
                  </li>
                </Link>
              )}

              {token && (
                <Link
                  href={role === 'TENANT' ? '/tenant/profile' : '/user/profile'}
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
      <div className="hidden 2xl:flex max-w-screen-xl m-auto  items-center justify-start w-full py-2">
        {menus.map(
          (
            item: { link: string; title: string; icon: React.JSX.Element },
            index,
          ) => {
            return (
              <Link key={index} href={item.link}>
                <div className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100">
                  <p>{item.title}</p>
                </div>
              </Link>
            )
          },
        )}
        {token ? (
          <div
            onClick={() => setShowConfirmationToLogout(true)}
            className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100"
          >
            <p>Sign out</p>
          </div>
        ) : (
          <Link href="/tenant/auth">
            <div className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:scale-90 origin-bottom transition duration-100">
              <p>Sign in or create account</p>
            </div>
          </Link>
        )}
      </div>
      <nav
        className={`2xl:hidden origin-top ${showHamburgerNav} transition duration-300 ease-in absolute left-0  top-[77px] bg-white border-b border-slate-200 shadow-md w-full h-fit z-50`}
      >
        {role === 'TENANT' && (
          <Link href="/tenant/property/create" className="2xl:flex hidden">
            <div className="p-5 px-7 border-b border-slate-300 text-sm font-semibold text-gray-800">
              Add property
            </div>
          </Link>
        )}
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
          <Link href="/tenant/auth">
            <div className="p-5 px-7 border-b border-slate-300 text-sm font-semibold text-gray-800">
              <p>Sign in or create account</p>
            </div>
          </Link>
        )}
      </nav>
    </nav>
  )
}

export default NavbarContentTenant

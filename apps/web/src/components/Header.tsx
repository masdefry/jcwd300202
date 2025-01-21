'use client'

import {
  IoEarth,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { IoPersonCircleOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import SearchHeader from './SearchHeader'
import useDropdownSearchHook from '@/hooks/useDropdownSearchHook'
import SearchHeaderDefault from './SearchHeaderDefault'
import HamburgerMenu from './HamburgerMenu'
import Promotion from './Promotion'
import authStore from '@/zustand/authStore'
import useSearchHook from '@/hooks/useSearchHook'
import { RiBuilding3Fill } from 'react-icons/ri'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  const setLogout = authStore((state) => state.setLogout)
  const profilePictureUrl = authStore((state) => state.profilePictureUrl)

  const [showConfirmationToLogout, setShowConfirmationToLogout] = useState(false)
  const [loadingPromotion, setLoadingPromotion] = useState(false)
  const {
    mutateShowDropdownDebounce,
    handleClearSearchInput,
    handleSearchInput,
    handleSearch,
    searchValues,
    setSearchValues,
    dataDropdown,
    setDataDropdown,
  } = useDropdownSearchHook()

  const { setSearchResults, searchResults } = useSearchHook()

  const pathname = usePathname()

  if (pathname.includes('/auth') || pathname.includes('/tenant') || pathname.includes('/user')) {
    return <></>
  }

  return (
    <header className="flex flex-col">
      <section className="bg-slate-200 flex flex-col relative">
        <HamburgerMenu />
        <section className="hidden lg:flex justify-between items-center bg-white shadow-md w-full h-full lg:px-16 md:px-12 sm:px-8 px-4">
          <div className="flex items-center">
            <div className="p-5">
              <Link href='/'>
              <div className="flex items-center gap-1.5 rounded-full p-1 px-2 text-white bg-gray-800">
                <RiBuilding3Fill className="text-white" size={30} />
                <p className="text-xs font-bold text-white">Roomify Inc.</p>
              </div>
              </Link>
            </div>
            <Link href="/explore/search?">
              <div className="border-b-4 border-transparent hover:border-blue-800 p-5 h-full text-base font-bold text-gray-800 hover:cursor-pointer active:bg-slate-200 transition duration-100">
                <p>Explore</p>
              </div>
            </Link>
          </div>
          <nav className="text-base font-medium py-5">
            <ul className="flex gap-8 items-center">
              {(token && role === 'TENANT') && (
                <Link href="/tenant/property/create">
                  <li className="border-b-2 border-transparent hover:border-black hover:cursor-pointer active:scale-90 transition duration-200">
                    Add your property
                  </li>
                </Link>
              )}
              {token ? (
                <Link
                  href={role === 'TENANT' ? '/tenant/profile' : '/user/profile'}
                >
                  <figure className="rounded-full h-10 w-10 border-2 border-green-400 bg-gray-900 overflow-hidden flex items-center justify-center">
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
              ) : (
                <Link href="/auth">
                  <li className="text-sm font-bold rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">
                    Sign in or create account
                  </li>
                </Link>
              )}
            </ul>
          </nav>
        </section>
        <section className="py-10 lg:px-16 md:px-12 sm:px-8 px-4">
          <hgroup className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center gap-2 text-gray-800 flex flex-col">
            <h1>Find Your Perfect Property, Effortlessly.</h1>
            <p className="text-base font-semibold text-gray-600">
              Easily find the perfect rental property that fits your needs and
              lifestyle.
            </p>
          </hgroup>
        </section>
        <section className="py-5 pb-16 lg:px-16 md:px-12 sm:px-8 px-4">
          <SearchHeader
            mutateShowDropdownDebounce={mutateShowDropdownDebounce}
            handleClearSearchInput={handleClearSearchInput}
            handleSearchInput={handleSearchInput}
            handleSearch={handleSearch}
            searchValues={searchValues}
            setSearchValues={setSearchValues}
            dataDropdown={dataDropdown}
            setDataDropdown={setDataDropdown}
            setSearchResults={setSearchResults}
          />
        </section>
      </section>
      {loadingPromotion === true ? (
        <section className="skeleton p-4 rounded-none sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[250px] w-full overflow-hidden relative"></section>
      ) : (
        <Promotion />
      )}
    </header>
  )
}

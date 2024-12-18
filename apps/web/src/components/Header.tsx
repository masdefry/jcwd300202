'use client'

import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SearchHeader2XLWidth from "./SearchHeader2XLWidth";
import useDropdownSearchHook from "@/hooks/useDropdownSearchHook";
import SearchHeaderDefault from "./SearchHeaderDefault";
import HamburgerMenu from "./HamburgerMenu";
import Promotion from "./Promotion";
import authStore from "@/zustand/authStore";

export default function Header() {
  const role = authStore(state => state.role)
  const token = authStore(state => state.token)
  const [ loadingPromotion, setLoadingPromotion ] = useState(false)
  const {
    mutateShowDropdownDebounce,
    handleClearSearchInput,
    handleSearchInput,
    handleSearch,
    searchValues,
    setSearchValues,
    dataDropdown,
    setDataDropdown
  } = useDropdownSearchHook()

  const pathname = usePathname()

  if(pathname.includes('/auth') || pathname.includes('/tenant')) {
    return <></>
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoadingPromotion(false)
  //   }, 1000)
  // }, [])

  return (
  <header className="flex flex-col">
    <section className="bg-slate-200 py-10 lg:px-16 md:px-12 sm:px-8 px-4 flex flex-col gap-10 relative">
      <HamburgerMenu />
      <section className="hidden lg:flex justify-between">
        <figure className="bg-blue-600 rounded-xl h-10 w-10">

        </figure>
        <nav className="text-base font-medium">
          <ul className="flex gap-8 items-center">
            <li><IoNotificationsOutline size={23}/></li>
            {
              role === 'TENANT' && (
                <Link href='/tenant/property/create'>
                  <li className="border-b-2 border-transparent hover:border-black hover:cursor-pointer active:scale-90 transition duration-200">Add your property</li>
                </Link>
              )
            }
            {
              token ? (
                <figure className="rounded-full h-7 w-7 bg-slate-400">

                </figure>
              ) : (
              <Link href='/auth'>
                <li className="rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200">Sign in or create account</li>
              </Link>
              ) 
            }
          </ul>
        </nav>
      </section>
      <section>
        <hgroup className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center gap-2">
          <h6>Where else do you want to go?</h6>
        </hgroup>
      </section>
      <SearchHeader2XLWidth 
      mutateShowDropdownDebounce={mutateShowDropdownDebounce}
      handleClearSearchInput={handleClearSearchInput}
      handleSearchInput={handleSearchInput}
      handleSearch={handleSearch}
      searchValues={searchValues}
      setSearchValues={setSearchValues}
      dataDropdown={dataDropdown}
      setDataDropdown={setDataDropdown}
      />
      <SearchHeaderDefault 
      mutateShowDropdownDebounce={mutateShowDropdownDebounce}
      handleClearSearchInput={handleClearSearchInput}
      handleSearchInput={handleSearchInput}
      handleSearch={handleSearch}
      searchValues={searchValues}
      setSearchValues={setSearchValues}
      dataDropdown={dataDropdown}
      setDataDropdown={setDataDropdown}
      />
    </section>
    {
      (loadingPromotion === true) ? (
        <section className='skeleton p-4 rounded-none sm:px-8 md:px-12 lg:px-16 justify-center flex flex-col gap-5 h-[250px] w-full overflow-hidden relative'></section>
      ):
      (
        <Promotion />
      )
    }
  </header>
);
};
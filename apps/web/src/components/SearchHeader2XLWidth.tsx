'use client'

import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

interface ISearchHeaderDefaultProps {
  mutateShowDropdownDebounce: any,
  handleClearSearchInput: any,
  handleSearchInput: any,
  handleSearch: any,
  searchValues: any,
  setSearchValues: any,
  dataDropdown: any,
  setDataDropdown: any
}

const SearchHeader2XLWidth = ({
  mutateShowDropdownDebounce,
  handleClearSearchInput,
  handleSearchInput,
  handleSearch,
  searchValues,
  setSearchValues,
  dataDropdown,
  setDataDropdown
  }: ISearchHeaderDefaultProps) => {

    const searchNavInputs = [
        {
          cssClass: 'border-r',
          title: 'Where are you going? (required)',
          name: 'searchLocation',
          icon:  <IoIosSearch size={23}/>,
          placeholder:"Jakarta / Indonesia"
        },
        {
          cssClass: 'border-r',
          title: 'Check-In',
          name: 'checkInDate', 
          icon: <CiCalendar size={23}/>,
          placeholder:"01/01/2000"
        },
        {
          cssClass: 'border-r',
          title: 'Check-Out',
          name: 'checkOutDate', 
          icon: <CiCalendar size={23}/>,
          placeholder:"02/01/2000"
        },
        {
          cssClass: '',
          title: 'Guest Room',
          name: 'guestRoom', 
          icon: <GoPerson size={23}/>,
          placeholder:"1 Room - 8 Guest"
        },
]
  return (
    <section className="hidden 2xl:grid grid-cols-4 items-center rounded-full bg-white p-2 relative">
        {
          searchNavInputs.map((item, index) => {
            return(
              <div key={index} className={`box-border ${item.cssClass} border-gray-300 flex flex-col px-5 gap-3`}>
                <label htmlFor={item.name} className="min-w-max flex items-center gap-3 text-base font-semibold">{item.icon}{item.title}</label>
                <input id={item.name} className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name={item.name} type="text" placeholder={item.placeholder} />
              </div>
            )
          })
        }
        <div className="w-[10%] flex justify-end absolute right-5">
          <button className="py-5 px-12 hover:opacity-75 active:scale-90 transition duration-200 rounded-full bg-blue-600 font-semibold text-base text-white">Search</button>
        </div>
    </section>
  )
}

export default SearchHeader2XLWidth

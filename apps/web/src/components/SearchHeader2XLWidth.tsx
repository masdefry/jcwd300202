'use client'

import React from 'react'
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import DropdownCitiesAndCountries from './DropdownCitiesAndCountries';

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

  return (
    <section className="hidden 2xl:grid grid-cols-4 items-center rounded-full bg-white p-2 relative">
        <div className='box-border border-r border-gray-300 flex flex-col px-5 gap-3'>
          <label htmlFor='searchLocation' className="min-w-max flex items-center gap-3 text-base font-semibold"><IoIosSearch size={23}/>Where are you going? (required)</label>
          <input value={handleSearch} onChange={(e) => {
            e.target.value.length >= 3 ? mutateShowDropdownDebounce(e.target.value) : setDataDropdown([])
            handleSearchInput(e)
            }}  
            id='searchLocation' 
            className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" 
            name='searchLocation' 
            type="text" 
            placeholder={searchValues.countryName ? '' : `Jakarta / Indonesia`} 
            disabled={searchValues.countryName ? true : false}/>
          <div className="absolute top-24 left-0 z-20 w-full">
            <DropdownCitiesAndCountries handleClearSearchInput={handleClearSearchInput} dataDropdown={dataDropdown} handleSearchInput={handleSearchInput} setDataDropdown={setDataDropdown} setSearchValues={setSearchValues}/>
          </div>
          {
            searchValues.countryName && (
              <div className="absolute top-[45px] left-[25px] flex items-center gap-3 px-5 py-2 text-sm rounded-badge bg-blue-600 font-semibold text-white">
                <p>{searchValues.cityName && searchValues.cityName + ', '}{searchValues.countryName}</p>
                <IoMdClose className='hover:cursor-pointer' size={17} onClick={() => {setSearchValues({countryId: '', cityId: '', countryName: '', cityName: ''})}}/>
              </div>
            )
          }
        </div>
        <div className='box-border border-r border-gray-300 flex flex-col px-5 gap-3'>
          <label htmlFor='checkInDate' className="min-w-max flex items-center gap-3 text-base font-semibold"><CiCalendar size={23}/>Check-In</label>
          <input id='checkInDate' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='checkInDate' type="text" placeholder="01/01/2000" />
        </div>
        <div className='box-border border-r border-gray-300 flex flex-col px-5 gap-3'>
          <label htmlFor='checkOutDate' className="min-w-max flex items-center gap-3 text-base font-semibold"><CiCalendar size={23}/>Check-Out</label>
          <input id='checkOutDate' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='checkOutDate' type="text" placeholder="02/01/2000" />
        </div>
        <div className='box-border border-gray-300 flex flex-col px-5 gap-3'>
          <label htmlFor='guestRoom' className="min-w-max flex items-center gap-3 text-base font-semibold"><GoPerson size={23}/>Guest Room</label>
          <input id='guestRoom' className="pt-2 p-1 box-border transition duration-200 text-base font-normal border-b-2 border-white focus:border-blue-600 focus:outline-none" name='guestRoom' type="text" placeholder="1 Room - 8 Guest" />
        </div>
        <div className="w-[10%] flex justify-end absolute right-5">
          <button className="py-5 px-12 hover:opacity-75 active:scale-90 transition duration-200 rounded-full bg-blue-600 font-semibold text-base text-white">Search</button>
        </div>
    </section>
  )
}

export default SearchHeader2XLWidth

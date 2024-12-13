'use client'

import React from 'react'
import DropdownCitiesAndCountries from './DropdownCitiesAndCountries'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { IoIosSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoMdClose } from 'react-icons/io'

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

const SearchHeaderDefault = ({
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
    <section className='2xl:hidden flex flex-col gap-3'>
        <div className="flex flex-col w-full items-start relative gap-1.5">
          <Label htmlFor="searchLocation" className="text-base font-semibold text-gray-600"><IoIosSearch size={23} className="inline mr-4 mb-1"/>Where are you going? <span className="text-red-600">*</span></Label>
          <Input value={handleSearch} onChange={(e) => {
            e.target.value.length >= 3 ? mutateShowDropdownDebounce(e.target.value) : setDataDropdown([])
            handleSearchInput(e)
            }} 
            type="text" id="searchLocation" name='searchLocation' placeholder={searchValues.countryName ? '' : `Jakarta / Indonesia`} className='placeholder-shown:text-sm rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
          <div className="absolute top-20 left-0 z-20 w-full">
            <DropdownCitiesAndCountries handleClearSearchInput={handleClearSearchInput} dataDropdown={dataDropdown} handleSearchInput={handleSearchInput} setDataDropdown={setDataDropdown} setSearchValues={setSearchValues}/>
          </div>
          {
            searchValues.countryName && (
              <div className="absolute top-[41px] left-[11px] flex items-center gap-3 px-5 py-1 text-xs rounded-badge bg-blue-600 font-semibold text-white">
                <p>{searchValues.cityName && searchValues.cityName + ', '}{searchValues.countryName}</p>
                <IoMdClose size={17} onClick={() => {setSearchValues({countryId: '', cityId: '', countryName: '', cityName: ''})}}/>
              </div>
            )
          }
        </div>
        <div className='flex flex-col md:flex-row md:gap-5 gap-3'>
          <div className="flex flex-col w-full items-start relative gap-1.5">
            <Label htmlFor="checkInDate" className="text-base font-semibold text-gray-600"><CiCalendar size={23} className="inline mr-4 mb-1"/>Check-In</Label>
            <Input type="text" id="checkInDate" name='checkInDate' placeholder="01/01/2000" className='placeholder-shown:text-sm rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
          </div>
          <div className="flex flex-col w-full items-start relative gap-1.5">
            <Label htmlFor="checkOutDate" className="text-base font-semibold text-gray-600"><CiCalendar size={23} className="inline mr-4 mb-1"/>Check-Out</Label>
            <Input type="text" id="checkOutDate" name='checkOutDate' placeholder="02/01/2000" className='placeholder-shown:text-sm rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
          </div>
        </div>
        <div className="flex flex-col w-full items-start relative gap-1.5">
          <Label htmlFor="guestRoom" className="text-base font-semibold text-gray-600"><GoPerson size={23} className="inline mr-4 mb-1"/>Guest Room</Label>
          <Input type="text" id="guestRoom" name='guestRoom' placeholder="1 Room - 8 Guest" className='placeholder-shown:text-sm rounded-full h-[3em] px-8 border border-slate-400 bg-white'/>
        </div>
      </section>
  )
}

export default SearchHeaderDefault

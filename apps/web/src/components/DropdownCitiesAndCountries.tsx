'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
// import { headerStore } from '@/zustand/headerStore'

export interface IDataDropDown {
  countryId: number,
  cityId: number,
  cityName: string,
  countryName: string
}

interface IDropdownCitesAndCountry {
  searchLocation: any,
  setSearchLocation: any,
  dataDropdown : IDataDropDown[] | [],
  setSearchValues : any,
  setDataDropdown: any,
  handleSearchInput: any
  handleClearSearchInput: any,
  setFieldValue: any
}

const DropdownCitiesAndCountries = ({ setFieldValue, searchLocation, setSearchLocation, dataDropdown, setSearchValues, setDataDropdown, handleSearchInput, handleClearSearchInput }: IDropdownCitesAndCountry) => {
    // const setCityAndCountrySearch = headerStore((state: any) => state.setCityAndCountrySearch)
  
    if(!Array.isArray(dataDropdown) || dataDropdown.length <= 0) {
      return <></>
    }

    return (
    <section className='bg-white shadow-md rounded-md border-2 border-slate-800 2xl:border-none overflow-hidden w-full'>
      <div>
        <ul>
          {
            dataDropdown?.map((item: IDataDropDown, index: number) => {
              return (
                <li onClick={() => {
                  setSearchLocation({countryId: item.countryId, cityId: item.cityId, countryName: item.countryName, cityName: item.cityName})
                  setSearchValues({countryId: item.countryId, cityId: item.cityId, countryName: item.countryName, cityName: item.cityName})
                  setFieldValue('country', item.countryId)
                  setFieldValue('city', item.cityId)
                  setDataDropdown((state: any[]) => {
                    state = []
                    return state
                  })
                  handleClearSearchInput()
                }} 
                key={index} className='text-sm font-bold py-2 flex justify-start items-center gap-1.5 hover:cursor-pointer hover:bg-gray-800 text-gray-800 hover:text-white px-2 2xl:px-8'><CiLocationOn size={23} />{item?.cityName && item?.cityName + ','} {item?.countryName}</li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default DropdownCitiesAndCountries

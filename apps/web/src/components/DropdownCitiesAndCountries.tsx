'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { headerStore } from '@/zustand/headerStore'

export interface IDataDropDown {
  countryId: number,
  cityId: number,
  cityName: string,
  countryName: string,
}

interface IDropdownCitesAndCountry {
  dataDropdown : IDataDropDown[] | [],
  setSearchValues : any,
  setDataDropdown: any,
  handleSearchInput: any
  handleClearSearchInput: any
}

const DropdownCitiesAndCountries = ({ dataDropdown, setSearchValues, setDataDropdown, handleSearchInput, handleClearSearchInput }: IDropdownCitesAndCountry) => {
    const setCityAndCountrySearch = headerStore((state: any) => state.setCityAndCountrySearch)
  
    if(!Array.isArray(dataDropdown) || dataDropdown.length <= 0) {
      return <></>
    }

    return (
    <section className='bg-white shadow-md rounded-3xl overflow-hidden w-full'>
      <div>
        <ul>
          {
            dataDropdown?.map((item: IDataDropDown, index: number) => {
              return (
                <li onClick={() => {
                  setCityAndCountrySearch({countryId: item.countryId, cityId: item.cityId, countryName: item.countryName, cityName: item.cityName})
                  setSearchValues({countryId: item.countryId, cityId: item.cityId, countryName: item.countryName, cityName: item.cityName})
                  setDataDropdown((state: any[]) => {
                    state = []
                    return state
                  })
                  handleClearSearchInput()
                }} 
                key={index} className='py-2 hover:bg-slate-300 text-black px-8'>{item?.cityName && item?.cityName + ','} {item?.countryName}</li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default DropdownCitiesAndCountries

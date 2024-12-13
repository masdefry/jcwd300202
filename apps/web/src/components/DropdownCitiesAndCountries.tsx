'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export interface IDataDropDown {
  countryId: number,
  cityId: number,
  cityName: string,
  countryName: string,
}

interface IDropdownCitesAndCountry {
  dataDropdown : IDataDropDown[] | [],
  setSearchValues : any,
  setDropdown: any,
  handleSearchInput: any
  handleClearSearchInput: any
}

const DropdownCitiesAndCountries = ({ dataDropdown, setSearchValues, setDropdown, handleSearchInput, handleClearSearchInput }: IDropdownCitesAndCountry) => {
    
  
    if(!Array.isArray(dataDropdown) || dataDropdown.length <= 0) {
      return <></>
    }

    return (
    <section className='bg-white border border-slate-400 rounded-3xl overflow-hidden w-full'>
      <div>
        <ul>
          {
            dataDropdown?.map((item: IDataDropDown, index: number) => {
              return (
                <li onClick={() => {
                  setSearchValues({countryId: item.countryId, cityId: item.cityId, countryName: item.countryName, cityName: item.cityName})
                  setDropdown([])
                  handleClearSearchInput()
                }} 
                key={index} className='py-2 hover:bg-slate-400 text-black px-8'>{item?.cityName && item?.cityName + ','} {item?.countryName}</li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default DropdownCitiesAndCountries

'use client'

import useMutateShowDropdownApi from '@/api/useMutateShowDropdownApi'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const useDropdownSearchHook = () => {

    const { 
      mutateShowDropdown 
    } = useMutateShowDropdownApi({
      onSuccess: (res) => {
        setDataDropdown(res)
      },
      onError: (err) => {
        console.log(err)
      }
    })

     const [ dataDropdown, setDataDropdown ] = useState([])
      const [ 
        searchValues, 
        setSearchValues 
      ] = useState({ 
        countryId: '', 
        cityId: '', 
        countryName: '',
        cityName: ''
      })
      const [ handleSearch, setHandleSearch ] = useState('')

      const mutateShowDropdownDebounce = useDebouncedCallback((value:string) => {
          mutateShowDropdown(value)
        }, 500)
      
        const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
          setHandleSearch(event.target.value)
        }
        const handleClearSearchInput = () => {
          setHandleSearch('')
        }
  
    return {
      mutateShowDropdownDebounce,
      handleClearSearchInput,
      handleSearchInput,
      handleSearch,
      searchValues,
      setSearchValues,
      dataDropdown,
      setDataDropdown
  }
}

export default useDropdownSearchHook

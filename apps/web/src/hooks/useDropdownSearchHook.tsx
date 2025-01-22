'use client'

import useMutateShowDropdownApi from '@/api/useMutateShowDropdownApi'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const useDropdownSearchHook = () => {

    const { 
      mutateShowDropdown 
    } = useMutateShowDropdownApi({
      onSuccess: (res) => {
        setDataDropdown(state => {
          state = [...res]
          return state
        })
      },
      onError: (err) => {
      }
    })

     const [ dataDropdown, setDataDropdown ] = useState<any[]>([])
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
        }, 200)
      
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

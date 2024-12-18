'use client'

import React from 'react'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface IUseMutateShowDropdownApiProps {
  onSuccess: (res: any) => void,
  onError: (res: AxiosError) => void,
}

const useMutateShowDropdownApi = ({ onSuccess, onError }: IUseMutateShowDropdownApiProps) => {
    const { mutate: mutateShowDropdown } = useMutation({
        mutationFn: async(value: string) => {
          const res = await instance.get(`/search/dropdown?search=${value}`)
          return res.data.data.dropdown
        },
        onSuccess,
        onError
    })
  
    return {
      mutateShowDropdown
    }
}

export default useMutateShowDropdownApi

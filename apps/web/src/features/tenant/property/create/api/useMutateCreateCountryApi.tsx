'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface IUseMutateCreateCountryApi { 
    dataCreateCountry: any, 
    setDataCreateCountry: any, 
    setShowCreateCountry: any,
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}
const useMutateCreateCountryApi = ({ dataCreateCountry, setDataCreateCountry, setShowCreateCountry, onSuccess, onError}: IUseMutateCreateCountryApi) => {
    const { mutate: mutateCreateCountry, isPending: isPendingCreateCountry } =
    useMutation({
      mutationFn: async () => {
        const fd = new FormData()
        fd.append('name', dataCreateCountry?.name)
        fd.append('description', dataCreateCountry?.description)
        fd.append('images', dataCreateCountry?.file[0])
        const res = await instance.post('/country', fd)

        return res?.data
      },
      onSuccess,
      onError,
    })
  
    return {
        mutateCreateCountry,
        isPendingCreateCountry
  }
}

export default useMutateCreateCountryApi

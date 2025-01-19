'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

interface IUseMutateCreateCityApi { 
    dataCreateCity: any, 
    setDataCreateCity: any, 
    setShowCreateCity: any,
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}
const useMutateCreateCityApi = ({ dataCreateCity, setDataCreateCity, setShowCreateCity, onSuccess, onError }: IUseMutateCreateCityApi) => {
    const { mutate: mutateCreateCity, isPending: isPendingCreateCity } =
    useMutation({
      mutationFn: async () => {
        const fd = new FormData()
        fd.append('cityName', dataCreateCity?.name)
        fd.append('countryId', (dataCreateCity?.countryId as number).toString())
        fd.append('images', dataCreateCity?.file[0])
        const res = await instance.post('/city', fd)
        return res?.data
      },
      onSuccess,
      onError,
    })
  
    return {
        mutateCreateCity,
        isPendingCreateCity
    }
}

export default useMutateCreateCityApi

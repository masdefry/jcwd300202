'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'


interface IUseMutateCreatePropertyFacilityApi { 
    dataCreatePropertyFacility: any, 
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}

const useMutateCreatePropertyFacilityApi = ({ onError, onSuccess, dataCreatePropertyFacility}: IUseMutateCreatePropertyFacilityApi) => {
    const {
        mutate: mutateCreatePropertyFacility,
        isPending: isPendingCreatePropertyFacility,
      } = useMutation({
        mutationFn: async () => {
          const fd = new FormData()
          fd.append('name', dataCreatePropertyFacility?.name)
          fd.append('images', dataCreatePropertyFacility?.file[0])
          const res = await instance.post('/property-facility', fd)
    
          console.log(res)
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateCreatePropertyFacility,
        isPendingCreatePropertyFacility
    }
}

export default useMutateCreatePropertyFacilityApi

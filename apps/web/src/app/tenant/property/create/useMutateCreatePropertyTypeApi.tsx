'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface IUseMutateCreatePropertyTypeApi { 
    dataCreatePropertyType: any, 
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}
const useMutateCreatePropertyTypeApi = ({ dataCreatePropertyType, onError, onSuccess }: IUseMutateCreatePropertyTypeApi) => {
  const {
    mutate: mutateCreatePropertyType,
    isPending: isPendingCreatePropertyType,
  } = useMutation({
    mutationFn: async (values) => {
      const res = await instance.post('/property-type', {
        name: dataCreatePropertyType?.name,
        description: dataCreatePropertyType?.description,
      })
      return res?.data
    },
    onSuccess,
    onError,
  })
  
    return {
        mutateCreatePropertyType,
        isPendingCreatePropertyType
    }
}

export default useMutateCreatePropertyTypeApi

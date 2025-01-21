'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'

interface IUseMutateCreatePropertyTypeApiProps {
  onSuccess: (res: any) => void,
  onError: (err: any) => void,
}
const useMutateCreatePropertyTypeApi = ({ onError, onSuccess }: IUseMutateCreatePropertyTypeApiProps) => {
    const {
        mutate: mutateCreatePropertyType,
        isPending: isPendingCreatePropertyType,
      } = useMutation({
        mutationFn: async (values: any) => {
          const res = await instance.post('/property-type', {
            name: values?.name,
            description: values?.description,
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

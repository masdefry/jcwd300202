'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface IUseMutateCreatePropertyApi { 
    onSuccess: (res: any) => void,
    onError: (err: any) => void,
}
const useMutateCreatePropertyApi = ({
    onSuccess,
    onError
} : IUseMutateCreatePropertyApi) => {
    const { mutate: mutateCreateProperty, isPending: isPendingCreateProperty } =
    useMutation({
      mutationFn: async (fd: FormData) => {
        const res = await instance.post('/property', fd)
        return res?.data
      },
      onSuccess,
      onError,
    })
  
    return {
        mutateCreateProperty,
        isPendingCreateProperty
  }
}

export default useMutateCreatePropertyApi

'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreatePropertyImageApi = ({ params, onSuccess, onError }: { onSuccess: (res: any) => void, onError: (err: any) => void, params: { slug: string } }) => {
    const {
        mutate: mutateCreatePropertyImage,
        isPending: isPendingCreatePropertyImage,
      } = useMutation({
        mutationFn: async (fd: FormData) => {
          const res = await instance.post(`/property-images/${params?.slug}`, fd)
          return res?.data
        },
        onSuccess,
        onError,
      })
    
  
    return {
        mutateCreatePropertyImage,
        isPendingCreatePropertyImage
  }
}

export default useMutateCreatePropertyImageApi

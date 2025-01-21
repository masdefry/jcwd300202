'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeletePropertyImageApi = ({ showPhoto, onError, onSuccess }: { onSuccess: (res: any) => void, onError: (err: any) => void, showPhoto: any }) => {
    const {
        mutate: mutateDeletePropertyImage,
        isPending: isPendingDeletePropertyImage,
      } = useMutation({
        mutationFn: async () => {
          const res = await instance.delete(`/property-images/${showPhoto?.id}`)
    
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateDeletePropertyImage,
        isPendingDeletePropertyImage
  }
}

export default useMutateDeletePropertyImageApi

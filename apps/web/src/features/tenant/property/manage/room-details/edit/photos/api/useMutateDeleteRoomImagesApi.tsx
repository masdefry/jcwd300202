'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeleteRoomImagesApi = ({ showPhoto, onError, onSuccess }: {showPhoto: any, onSuccess: (res: any) => void, onError: (err: any) => void }) => {
    const {
        mutate: mutateDeletePropertyImage,
        isPending: isPendingDeletePropertyImage,
      } = useMutation({
        mutationFn: async () => {
          const res = await instance.delete(
            `/property-room-images/${showPhoto?.id}`,
          )
    
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

export default useMutateDeleteRoomImagesApi

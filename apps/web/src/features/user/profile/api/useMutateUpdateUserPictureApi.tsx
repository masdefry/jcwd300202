'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateUserPictureApi = ({ onSuccess, onError }: { onSuccess: (res: any) => void, onError: (err: any) => void, }) => {
    const {
        mutate: mutateUpdateUserProfilePicture,
        isPending: isPendingUpdateUserProfilePicture,
      } = useMutation({
        mutationFn: async (fd) => {
          const res = await instance.patch('/user/profile-picture', fd)
          return res?.data
        },
        onSuccess,
        onError
      })
  
    return {
        mutateUpdateUserProfilePicture,
        isPendingUpdateUserProfilePicture
  }
}

export default useMutateUpdateUserPictureApi

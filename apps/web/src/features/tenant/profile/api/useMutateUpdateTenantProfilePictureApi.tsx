'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateTenantProfilePictureApi = ({
  onError,
  onSuccess,
}: {
  onError: (err: any) => void
  onSuccess: (res: any) => void
}) => {
  const {
    mutate: mutateUpdateTenantProfilePicture,
    isPending: isPendingUpdateTenantProfilePicture,
  } = useMutation({
    mutationFn: async (fd) => {
      const res = await instance.patch('/tenant/profile-picture', fd)
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdateTenantProfilePicture,
    isPendingUpdateTenantProfilePicture
  }
}

export default useMutateUpdateTenantProfilePictureApi

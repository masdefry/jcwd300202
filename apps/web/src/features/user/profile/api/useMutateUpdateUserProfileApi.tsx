'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateUserProfileApi = ({
  onSuccess,
  onError,
}: {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateUpdateUserProfile,
    isPending: isPendingUpdateUserProfile,
  } = useMutation({
    mutationFn: async ({
      email,
      username,
      gender,
      phoneNumber,
      date,
      month,
      year,
      address,
    }: any) => {
      const res = await instance.patch('/user', {
        email,
        username,
        gender,
        phoneNumber,
        date,
        month,
        year,
        address,
      })
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdateUserProfile,
    isPendingUpdateUserProfile

  }
}

export default useMutateUpdateUserProfileApi

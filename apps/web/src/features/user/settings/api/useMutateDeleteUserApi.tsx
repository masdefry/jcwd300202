'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeleteUserApi = ({
  passwordForDelete,
  onError,
  onSuccess,
}: {
  onSuccess: (res: any) => void
  onError: (res: any) => void
  passwordForDelete: any
}) => {
  const { mutate: mutateDeleteAccount, isPending: isPendingDeleteAccount } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.patch('/user/delete', {
          password: passwordForDelete?.password,
        })
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateDeleteAccount,
    isPendingDeleteAccount
  }
}

export default useMutateDeleteUserApi

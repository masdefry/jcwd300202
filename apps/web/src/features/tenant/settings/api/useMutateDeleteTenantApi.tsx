'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeleteTenantApi = ({
  onError,
  onSuccess,
}: {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateDeleteAccount, isPending: isPendingDeleteAccount } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.delete('/tenant')
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

export default useMutateDeleteTenantApi

'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateEmailTenantApi = ({
    onError,
    onSuccess,
    newEmail
  }: {
    onError: (err: any) => void
    onSuccess: (res: any) => void
    newEmail: string
  }) => {
    const { mutate: mutateUpdateEmail, isPending: isPendingUpdateEmail } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.patch('/tenant/email', {
          email: newEmail,
        })
        return res?.data
      },
      onSuccess,
      onError,
    })
  
    return {
    mutateUpdateEmail,
    isPendingUpdateEmail
  }
}

export default useMutateUpdateEmailTenantApi

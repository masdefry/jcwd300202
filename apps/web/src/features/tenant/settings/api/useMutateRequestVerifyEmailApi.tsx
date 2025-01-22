'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateRequestVerifyEmailApi = ({
    onError,
    onSuccess,
  }: {
    onSuccess: (res: any) => void
    onError: (err: any) => void
  }) => {
    const {
        mutate: mutateRequestVerifyEmail,
        isPending: isPendingRequestVerifyEmail,
      } = useMutation({
        mutationFn: async () => {
          const res = await instance.post(
            '/auth/tenant/verify-change-email-request',
          )
          return res?.data
        },
        onSuccess,
        onError
      })
    
  
    return {
        mutateRequestVerifyEmail,
        isPendingRequestVerifyEmail
  }
}

export default useMutateRequestVerifyEmailApi

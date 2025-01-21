'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface IUseMutateRequestVerifyEmailApiProps {
  onSuccess: (res: any) => void,
  onError: (res: any) => void,
}

const useMutateRequestVerifyEmailApi = ({ onSuccess, onError }: IUseMutateRequestVerifyEmailApiProps) => {
    const {
        mutate: mutateRequestVerifyEmail,
        isPending: isPendingRequestVerifyEmail,
      } = useMutation({
        mutationFn: async () => {
          const res = await instance.post('/auth/verify-change-email-request')
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

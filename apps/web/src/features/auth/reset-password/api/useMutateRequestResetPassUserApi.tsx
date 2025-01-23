'use client'

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IValuesRequestEmailResetPassword } from '../types'
import instance from '@/utils/axiosInstance'

interface IUseMutateRequestResetPassUserApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}
const useMutateRequestResetPassUserApi = ({
  onError,
  onSuccess,
}: IUseMutateRequestResetPassUserApiProps) => {
  const {
    mutate: mutateRequestEmailResetPassword,
    isPending: isPendingRequestEmailResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesRequestEmailResetPassword) => {
      return await instance.post('/auth/send-email-reset-password', {
        email: values?.email,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutateRequestEmailResetPassword,
    isPendingRequestEmailResetPassword,
  }
}

export default useMutateRequestResetPassUserApi

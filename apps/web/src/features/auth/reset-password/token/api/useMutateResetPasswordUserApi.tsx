'use client'

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IValuesMutateResetPassword } from '../types'
import instance from '@/utils/axiosInstance'

interface IUseMutateResetPasswordUserApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
  params: { token: string }
}
const useMutateResetPasswordUserApi = ({
  params,
  onError,
  onSuccess,
}: IUseMutateResetPasswordUserApiProps) => {
  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: isSuccessResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesMutateResetPassword) => {
      return await instance.patch(
        '/auth/reset-password',
        {
          password: values?.setPassword,
        },
        {
          headers: {
            authorization: `Bearer ${params.token}`,
          },
        },
      )
    },
    onSuccess,
    onError,
  })

  return {
    mutateResetPassword,
    isPendingResetPassword,
    isSuccessResetPassword,
  }
}

export default useMutateResetPasswordUserApi

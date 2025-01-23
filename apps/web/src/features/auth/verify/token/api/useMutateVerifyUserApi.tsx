'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IValuesVerifyEmailUser } from '../types'

interface IUseMutateVerifyUserApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
  params: { token: string }
}
const useMutateVerifyUserApi = ({
  params,
  onError,
  onSuccess,
}: IUseMutateVerifyUserApiProps) => {
  const {
    mutate: mutateVerifyEmail,
    isPending: isPendingVerifyEmail,
    isSuccess: isSuccessVerifyEmail,
  } = useMutation({
    mutationFn: async (values: IValuesVerifyEmailUser) => {
      return await instance.patch(
        '/auth/verify-email',
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
    mutateVerifyEmail,
    isPendingVerifyEmail,
    isSuccessVerifyEmail,
  }
}

export default useMutateVerifyUserApi

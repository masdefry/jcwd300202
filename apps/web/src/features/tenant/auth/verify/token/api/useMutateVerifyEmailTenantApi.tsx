'use client'

import React from 'react'
import { IValuesVerifyEmailTenant } from '../types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface IUseMutateVerifyTenantApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
  params: { token: string }
}
const useMutateVerifyEmailTenantApi = ({
  params,
  onError,
  onSuccess,
}: IUseMutateVerifyTenantApiProps) => {
  const {
    mutate: mutateVerifyEmail,
    isPending: isPendingVerifyEmail,
    isSuccess: isSuccessVerifyEmail,
  } = useMutation({
    mutationFn: async (values: IValuesVerifyEmailTenant) => {
      return await instance.patch(
        '/auth/tenant/verify-email',
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

export default useMutateVerifyEmailTenantApi

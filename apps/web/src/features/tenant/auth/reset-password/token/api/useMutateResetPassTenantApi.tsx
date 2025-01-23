'use client'

import { IValuesMutateResetPassword } from '@/features/auth/reset-password/token/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface IUseMutateResetPassTenantApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
  params: { token: string }
}
const useMutateResetPassTenantApi = ({
  params,
  onError,
  onSuccess,
}: IUseMutateResetPassTenantApiProps) => {
  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: isSuccessResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesMutateResetPassword) => {
      return await instance.patch(
        '/auth/tenant/reset-password',
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
    isSuccessResetPassword
  }
}

export default useMutateResetPassTenantApi

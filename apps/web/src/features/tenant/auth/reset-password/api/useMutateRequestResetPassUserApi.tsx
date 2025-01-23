'use client'

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IValuesRequestEmailResetPassword } from '../../verify/request-email/types'
import instance from '@/utils/axiosInstance'

interface IUseMutateRequestResetPassTenantApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}
const useMutateRequestResetPassTenantApi = ({
  onError,
  onSuccess,
}: IUseMutateRequestResetPassTenantApiProps) => {
  const {
    mutate: mutateRequestEmailResetPassword,
    isPending: isPendingRequestEmailResetPassword,
  } = useMutation({
    mutationFn: async (values: IValuesRequestEmailResetPassword) => {
      return await instance.post('/auth/tenant/send-email-reset-password', {
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

export default useMutateRequestResetPassTenantApi

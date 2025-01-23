'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IValuesRequestEmailResetPassword } from '../types'

interface IUseMutateRequestEmailUserApiProps {
    onSuccess: (res: any) => void
    onError: (err: any) => void
  }
const useMutateRequestEmailUserApi = ({onError,
    onSuccess
} : IUseMutateRequestEmailUserApiProps) => {
    const {
        mutate: mutateRequestEmailResetPassword,
        isPending: isPendingRequestEmailResetPassword,
      } = useMutation({
        mutationFn: async (values: IValuesRequestEmailResetPassword) => {
          return await instance.post('/auth/tenant/verify-email-request', {
            email: values?.email,
          })
        },
        onSuccess,
        onError,
      })
    
  
    return {
        isPendingRequestEmailResetPassword,
        mutateRequestEmailResetPassword
    }
}

export default useMutateRequestEmailUserApi

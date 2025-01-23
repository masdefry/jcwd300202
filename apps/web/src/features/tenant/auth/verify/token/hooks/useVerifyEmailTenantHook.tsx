'use client'

import React from 'react'
import useMutateVerifyEmailTenantApi from '../api/useMutateVerifyEmailTenantApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const useVerifyEmailTenantHook = ({
  params,
}: {
  params: { token: string }
}) => {
  const router = useRouter()

  interface IValuesVerifyEmailTenant {
    setPassword: string
  }

  const { mutateVerifyEmail, isPendingVerifyEmail, isSuccessVerifyEmail } =
    useMutateVerifyEmailTenantApi({
      params,
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            Verify account success
          </span>
        ))
        setTimeout(() => {
          router.push('/tenant/auth')
        }, 1500)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  return {
    isPendingVerifyEmail,
    isSuccessVerifyEmail,
    mutateVerifyEmail,
  }
}

export default useVerifyEmailTenantHook

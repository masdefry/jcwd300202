'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import useMutateRequestEmailUserApi from '../api/useMutateRequestEmailUserApi'
import toast from 'react-hot-toast'

const useRequestVerifyEmailUserHook = () => {
  const router = useRouter()
  interface IValuesRequestEmailResetPassword {
    email: string
  }

  const {
    mutateRequestEmailResetPassword,
    isPendingRequestEmailResetPassword,
  } = useMutateRequestEmailUserApi({
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          Request email verify success
        </span>
      ))
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
      if (err?.response?.data?.message === 'Email already verified!') {
        setTimeout(() => {
          router.push('/auth')
        }, 1500)
      }
    },
  })

  return {
    isPendingRequestEmailResetPassword,
    mutateRequestEmailResetPassword
  }
}

export default useRequestVerifyEmailUserHook

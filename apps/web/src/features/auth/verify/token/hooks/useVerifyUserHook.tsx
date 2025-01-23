'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import useMutateVerifyUserApi from '../api/useMutateVerifyUserApi'

const useVerifyUserHook = ({ params }: { params: { token: string } }) => {
  const router = useRouter()

  const { mutateVerifyEmail, isPendingVerifyEmail, isSuccessVerifyEmail } =
    useMutateVerifyUserApi({
      params,
      onSuccess: (res: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            Verify account success
          </span>
        ))
        setTimeout(() => {
          router.push('/auth')
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
    mutateVerifyEmail,
    isPendingVerifyEmail,
    isSuccessVerifyEmail,
  }
}

export default useVerifyUserHook

'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import useMutateResetPasswordUserApi from '../api/useMutateResetPasswordUserApi'
import toast from 'react-hot-toast'

const useResetPasswordUserHook = ({
  params,
}: {
  params: { token: string }
}) => {
  const router = useRouter()

  const handleClearSearchParams = () => {
    const url =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname
    window.history.replaceState({}, '', url)
  }
  interface IValuesMutateResetPassword {
    setPassword: string
  }
  const {
    mutateResetPassword,
    isPendingResetPassword,
    isSuccessResetPassword,
  } = useMutateResetPasswordUserApi({
    params,
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          Reset password success
        </span>
      ))
      setTimeout(() => {
        router.push('/auth')
      })
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
    mutateResetPassword,
    isPendingResetPassword,
    isSuccessResetPassword,
    handleClearSearchParams,
  }
}

export default useResetPasswordUserHook

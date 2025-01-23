'use client'

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import useMutateResetPassTenantApi from '../api/useMutateResetPassTenantApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const useResetPasswordTenantHook = ({
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
  } = useMutateResetPassTenantApi({
    params,
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          Reset password success
        </span>
      ))
      setTimeout(() => {
        router.push('/tenant/auth')
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

export default useResetPasswordTenantHook

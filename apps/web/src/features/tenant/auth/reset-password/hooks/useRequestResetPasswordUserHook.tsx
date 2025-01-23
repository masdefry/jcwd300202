'use client'

import React from 'react'
import useMutateRequestResetPassTenantApi from '../api/useMutateRequestResetPassUserApi'
import toast from 'react-hot-toast'

const useRequestEmailResetPasswordTenantHook = () => {
  const {
    mutateRequestEmailResetPassword,
    isPendingRequestEmailResetPassword,
  } = useMutateRequestResetPassTenantApi({
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center text-sm">
          Check your email to reset password
          <button
            className="bg-gray-900 hover:opacity-75 active:scale-90 text-white rounded-full px-4 py-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ))
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
    mutateRequestEmailResetPassword,
    isPendingRequestEmailResetPassword,
  }
}

export default useRequestEmailResetPasswordTenantHook

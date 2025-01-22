'use client'

import React, { useState } from 'react'
import useMutateDeleteTenantApi from '../api/useMutateDeleteTenantApi'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import authStore from '@/zustand/authStore'
import useMutateRequestVerifyEmailApi from '../api/useMutateRequestVerifyEmailApi'

const useManageTenantSettingsHook = () => {
  const setLogout = authStore((state) => state.setLogout)
  const [isDeleted, setIsDeleted] = useState(false)
  const [change, setChange] = useState(true)
  const [passwordForDelete, setPasswordForDelete] = useState({
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateDeleteAccount, isPendingDeleteAccount } =
    useMutateDeleteTenantApi({
      onSuccess: (res) => {
        setIsDeleted(true)
        setLogout()
        Cookies.remove('authToken')
        Cookies.remove('authRole')
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.href = '/'
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

  const { mutateRequestVerifyEmail, isPendingRequestVerifyEmail } =
    useMutateRequestVerifyEmailApi({
      onSuccess: (res) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            Check your email to verify!
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
          <span className="flex gap-2 items-center justify-center text-xs font-semibold text-red-700">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  return {
    isDeleted,
    setIsDeleted,
    change,
    setChange,
    passwordForDelete,
    setPasswordForDelete,
    isSubmitting,
    setIsSubmitting,
    mutateDeleteAccount,
    isPendingDeleteAccount,
    mutateRequestVerifyEmail,
    isPendingRequestVerifyEmail,
  }
}

export default useManageTenantSettingsHook

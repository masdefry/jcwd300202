'use client'

import Cookies from 'js-cookie'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useMutateRequestVerifyEmailApi from '../api/useMutateRequestVerifyEmailApi'
import useMutateDeleteUserApi from '../api/useMutateDeleteUserApi'
import authStore from '@/zustand/authStore'

const useManageUserSettingsHook = () => {
  const setLogout = authStore((state) => state.setLogout())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [change, setChange] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [passwordForDelete, setPasswordForDelete] = useState({
    password: '',
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

  const { mutateDeleteAccount, isPendingDeleteAccount } =
    useMutateDeleteUserApi({
      passwordForDelete,
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
        }, 1000)
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
    isSubmitting,
    setIsSubmitting,
    change,
    setChange,
    isDeleted,
    passwordForDelete,
    setPasswordForDelete,
    mutateRequestVerifyEmail,
    isPendingRequestVerifyEmail,
    mutateDeleteAccount,
    isPendingDeleteAccount,
  }
}

export default useManageUserSettingsHook

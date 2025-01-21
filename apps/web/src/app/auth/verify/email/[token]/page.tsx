'use client'

import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import authStore from '@/zustand/authStore'
import toast from 'react-hot-toast'

export default function VerifyEmailTenantPage ({ params }: { params: { token: string } }) {
  const router = useRouter()
  const setLogout = authStore(state => state.setLogout)
  const { mutate: mutateVerifyEmail, isPending: isPendingVerifyEmail } = useMutation({
    mutationFn: async() => {
      const res = await instance.patch(`/auth/verify-change-email/${params?.token}`, {}, {
        headers: {
          authorization: `Bearer ${params.token}`
        }
      })
      return res?.data
    },
    onSuccess: (res) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          Verify new email success
        </span>
      ))
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    },
    onError: (err) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          Verify new email failed
        </span>
      ))
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  })

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-md p-6 rounded-lg bg-white shadow-lg">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">Verify Your Email</h2>
            <p className="mt-2 text-sm font-medium text-gray-600">Click the button below to complete the email verification process.</p>

              <button
                onClick={() => mutateVerifyEmail()}
                disabled={isPendingVerifyEmail}
                className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 mt-6 px-6 py-2 bg-slate-800 text-sm font-bold text-white rounded-full hover:opacity-75 active:scale-95 transition duration-100"
              >
                Verify Email
              </button>
          </div>
      </div>
    </div>
  )
}

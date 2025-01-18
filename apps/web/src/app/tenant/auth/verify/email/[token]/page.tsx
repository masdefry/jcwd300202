'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import authStore from '@/zustand/authStore'
import toast from 'react-hot-toast'

const VerifyEmailTenantPage = ({ params }: { params: { token: string } }) => {
  const router = useRouter()
  const setLogout = authStore(state => state.setLogout)
  const { isPending: isPendingVerifyEmailTenant, isError: isErrorVerifyEmailTenant, isSuccess: isSuccessVerifyEmailTenant, error: errorVerifyEmailTenant } = useQuery({
    queryKey: ['verifyTenant'],
    queryFn: async() => {
      const res = await instance.patch(`/auth/tenant/verify-change-email/${params?.token}`, {}, {
        headers: {
          authorization: `Bearer ${params.token}`
        }
      })
      return res?.data?.data
    },
  })

  if(isPendingVerifyEmailTenant) {
    return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-8 border-t-8 border-transparent border-t-gray-900 rounded-full animate-spin"></div>
        <h2 className="text-gray-800 text-lg font-bold">Loading</h2>
        <p className="text-gray-600 text-sm font-medium text-center opacity-75 mt-[-30px]">Please wait while we verify your email</p>
      </div>
    </div>
    )
  }

  if(isErrorVerifyEmailTenant) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-gray-900 p-5">
        <div className="text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="text-6xl font-bold">500</div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Oops! Sorry</h1>
          <p className="text-sm font-medium text-gray-600 mb-8 opacity-75">
            Something went wrong
          </p>
          <Link href='/' className='flex items-center justify-center w-full'>
            <div className="w-fit px-6 py-2 bg-slate-900 text-white rounded-full hover:cursor-pointer hover:opacity-75 transition duration-100 active:scale-90 text-sm font-bold">
              Go Back Home
            </div>
          </Link>
        </div>
      </div>
    )
  }

  if(isSuccessVerifyEmailTenant) {
    toast((t) => (
      <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
        Verify new email success
      </span>
    ))
    setTimeout(() => {
      window.location.href = '/tenant/auth'
    }, 1500)
  }

  return (
    <></>
  )
}

export default VerifyEmailTenantPage

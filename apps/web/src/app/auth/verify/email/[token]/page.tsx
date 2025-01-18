'use client'

import React, { useEffect, useState } from 'react'
import instance from '@/utils/axiosInstance'
import Link from 'next/link'
import toast from 'react-hot-toast'

const VerifyEmailUserPage = ({ params }: { params: { token: string } }) => {
  const [isPendingVerifyEmailUser, setIsPendingVerifyEmailUser] = useState(true)
  const [isErrorVerifyEmailUser, setIsErrorVerifyEmailUser] = useState(false)
  const [isSuccessVerifyEmailUser, setIsSuccessVerifyEmailUser] = useState(false)

  const fetchVerifyEmail = async() => {
    try {
      const res = await instance.patch(`/auth/verify-change-email/${params?.token}`, {}, {
        headers: {
          authorization: `Bearer ${params.token}`
        }
      })
      console.log('res', res)
      console.log('err', res)
      setIsSuccessVerifyEmailUser(true)
    } catch (error) {
      console.log('err', error)
      setIsErrorVerifyEmailUser(true)
    } finally {
      console.log('final', '>>>>>>>>>>>>>>>>>>>>>>>')
      setIsPendingVerifyEmailUser(false)
    }
  }

  useEffect(() => {
    fetchVerifyEmail()
  }, [])
  // const { isPending: isPendingVerifyEmailUser, isError: isErrorVerifyEmailUser, isSuccess: isSuccessVerifyEmailUser, error: errorVerifyEmailUser } = useQuery({
  //   queryKey: ['verifyUser'],
  //   queryFn: async() => {
      // const res = await instance.patch(`/auth/verify-change-email/${params?.token}`, {}, {
      //   headers: {
      //     authorization: `Bearer ${params.token}`
      //   }
      // })
  //     return res?.data?.data
  //   },
  // })

  if(isPendingVerifyEmailUser) {
    return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-8 border-t-8 border-transparent border-t-gray-900 rounded-full animate-spin"></div>
        <h2 className="text-gray-800 text-lg font-bold">Loading</h2>
        <p className="text-gray-600 text-sm text-center font-medium opacity-75 mt-[-30px]">Please wait while we verify your email</p>
      </div>
    </div>
    )
  }

  if(isErrorVerifyEmailUser) {
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

  if(isSuccessVerifyEmailUser) {
    toast((t) => (
      <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
        Verify new email success
      </span>
    ))
    setTimeout(() => {
      window.location.href = '/auth'
    }, 1500)
  }

  return (
    <main>
      Verify Email Success
    </main>
  )
}

export default VerifyEmailUserPage

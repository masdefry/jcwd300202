'use client'

import React from 'react'
import toast from 'react-hot-toast'
import useMutateReqOAuthApi from '../api/useMutateReqOAuthApi'
import useMutateOAuthApi from '../api/useMutateOAuthApi'
import authStore from '@/zustand/authStore'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const useLoginWithGoogleHook = () => {
    const router = useRouter()
    const setAuth = authStore(state => state.setAuth)

    const onSuccessReqOAuth = (res: AxiosResponse) => {
        Cookies.set('authToken', res?.data?.data?.token, { expires: 7 })
        Cookies.set('authRole', res?.data?.data?.role, { expires: 7 })
        setAuth({
            isGoogleRegistered: res?.data?.data?.isGoogleRegistered,
            isVerified: res?.data?.data?.isVerified,
            role: res?.data?.data?.role,
            token: res?.data?.data?.token,
            username: res?.data?.data?.username,
            country: res?.data?.data?.country,
        })
        toast((t) => (
            <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
              Login success
            </span>
          ))
        setTimeout(() => {
            router.push('/')
        }, 1500)
    } 
    const onErrorReqOAuth = (err: any) => {
        toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
    
    const { mutateReqOAuth, isPendingReqOAuth } = useMutateReqOAuthApi({ onSuccess: onSuccessReqOAuth, onError: onErrorReqOAuth })
    
    const onSuccessOAuth = async(res: any) => {
        mutateReqOAuth( res?.user?.email as string )
    }
    const onErrorOAuth = (err: any) => {
        toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
    
    const { mutateOAuth, isPendingOAuth } = useMutateOAuthApi({ onSuccess: onSuccessOAuth, onError: onErrorOAuth })


    return {
        mutateOAuth,
        isPendingOAuth,
        isPendingReqOAuth
    }
}

export default useLoginWithGoogleHook

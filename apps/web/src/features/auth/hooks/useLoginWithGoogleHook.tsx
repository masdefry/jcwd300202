'use client'

import React from 'react'
import { toast } from '@/hooks/use-toast'
import useMutateReqOAuthApi from '../api/useMutateReqOAuthApi'
import useMutateOAuthApi from '../api/useMutateOAuthApi'
import authStore from '@/zustand/authStore'
import { AxiosResponse } from 'axios'

const useLoginWithGoogleHook = () => {
    const setAuth = authStore(state => state.setAuth)

    const onSuccessReqOAuth = (res: AxiosResponse) => {
        setAuth({
            isGoogleRegistered: res?.data?.data?.isGoogleRegistered,
            isVerified: res?.data?.data?.isVerified,
            role: res?.data?.data?.role,
            token: res?.data?.data?.token,
            username: res?.data?.data?.username,
        })
        toast({
            title: `Login user success`,
            description: 'Enjoy roomify!'
        })
    } 
    const onErrorReqOAuth = (err: any) => {
        toast({
            title: `Login user failed!`,
            description: 'Try again',
            variant: 'destructive'
        }) 
    }
    
    const { mutateReqOAuth, isPendingReqOAuth } = useMutateReqOAuthApi({ onSuccess: onSuccessReqOAuth, onError: onErrorReqOAuth })
    
    const onSuccessOAuth = async(res: any) => {
        mutateReqOAuth( res?.user?.email as string )
    }
    const onErrorOAuth = (err: any) => {
        toast({
            title: `Login user failed!`,
            description: 'Authentication  with Google failed',
            variant: 'destructive'
        }) 
    }
    
    const { mutateOAuth, isPendingOAuth } = useMutateOAuthApi({ onSuccess: onSuccessOAuth, onError: onErrorOAuth })


    return {
        mutateOAuth,
        isPendingOAuth,
        isPendingReqOAuth
    }
}

export default useLoginWithGoogleHook

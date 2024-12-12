'use client'

import React from 'react'
import { useMutation } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import { AxiosError, AxiosResponse } from 'axios'

interface IUseMutateReqOAuthApiProps {
    onSuccess: (res: AxiosResponse) => void,
    onError: (err: AxiosError) => void
}

const useMutateReqOAuthApi = ({ onSuccess, onError }: IUseMutateReqOAuthApiProps) => {

    const { mutate: mutateReqOAuth, isPending: isPendingReqOAuth } = useMutation({
    mutationFn: async(email: string) => {
        const res = await instance.post('/auth/o-auth', {
            email
        })
        return res
    }, 
    onSuccess, 
    onError
})

    return {
        mutateReqOAuth,
        isPendingReqOAuth
  }
}

export default useMutateReqOAuthApi

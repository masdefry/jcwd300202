'use client'

import React from 'react'
import { useMutation } from '@tanstack/react-query'
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebase'
import { AxiosResponse } from 'axios'

interface IUseMutateLoginApiProps {
    onSuccess: (res: any) => void,
    onError: (err: any) => void
}

const useMutateOAuthApi = ({ onSuccess, onError }: IUseMutateLoginApiProps) => {
    const provider = new GoogleAuthProvider()
    const router = useRouter()

const { mutate: mutateOAuth, isPending: isPendingOAuth } = useMutation({
    mutationFn: async() => {
        const firebase = await signInWithPopup(auth, provider)
        return firebase
    },
    onSuccess,
    onError
})
  
    return {
        mutateOAuth,
        isPendingOAuth
  }
}

export default useMutateOAuthApi

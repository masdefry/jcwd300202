'use client'

import toast from 'react-hot-toast'
import useMutateLoginApi from '../api/useMutateLoginApi'
import { AxiosError, AxiosResponse } from 'axios'
import authStore from '@/zustand/authStore'
import { useRouter } from 'next/navigation'

interface IUseLoginHookProps {
    endPoint: string,
    role: string
}

const useLoginHook = ({ endPoint, role }: IUseLoginHookProps) => {
    const setAuth = authStore(state => state.setAuth)
    const router = useRouter()

    interface IValuesLogin {
        email: string,
        password: string
      }  

      const { 
        mutateLogin, 
        isPendingLogin
    } = useMutateLoginApi({ 
        endPoint, 
        onSuccess:(res: any) => {
            toast.success('Login success!')
            setAuth({ 
                isVerified: res?.isVerified,
                profilePictureUrl: res?.profilePictureUrl,
                username: res?.username,
                token: res?.token,
                role: res?.role,
                country: res?.country,
            })
            if(role !== 'tenant') {
                setTimeout(() => {
                    router.push('/')
                }, 1500)
            } else {
                setTimeout(() => {
                    router.push('/tenant/profile')
                }, 1500)
            }
        }, 
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Connection error!')
        }})
  
    return {
        mutateLogin, 
        isPendingLogin
    }
}

export default useLoginHook

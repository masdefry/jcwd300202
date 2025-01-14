'use client'

import toast from 'react-hot-toast'
import useMutateLoginApi from '../api/useMutateLoginApi'
import { AxiosError, AxiosResponse } from 'axios'
import authStore from '@/zustand/authStore'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

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
            toast((t) => (
                <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
                  Login success
                </span>
              ))
            Cookies.set('authToken', res?.token, { expires: 7 })
            Cookies.set('authRole', res?.role, { expires: 7 })
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
                    router.push('/tenant/property/list')
                }, 1500)
            }
        }, 
        onError: (err: any) => {
            toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
        }})
  
    return {
        mutateLogin, 
        isPendingLogin
    }
}

export default useLoginHook

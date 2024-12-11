'use client'

import { toast } from '@/hooks/use-toast'
import useMutateLoginApi from '../api/useMutateLoginApi'
import { AxiosError, AxiosResponse } from 'axios'

interface IUseLoginHookProps {
    endPoint: string,
    role: string
}

const useLoginHook = ({ endPoint, role }: IUseLoginHookProps) => {
    interface IValuesLogin {
        email: string,
        password: string
      }  

      const { 
        mutateLogin, 
        isPendingLogin 
    } = useMutateLoginApi({ 
        endPoint, 
        onSuccess:(res: AxiosResponse) => {
            toast({
                title: `Login ${role} success`,
                description: 'Enjoy roomify!'
            })
        }, 
        onError: (err: any) => {
            let description;
            if(err?.response?.data?.message === 'Please verify email first!') {
                description = 'Please check your email to verify'
            }
            toast({
                title: `Login ${role} failed!`,
                description,
                variant: 'destructive'
            }) 
        } })
  
    return {
        mutateLogin, 
        isPendingLogin
    }
}

export default useLoginHook

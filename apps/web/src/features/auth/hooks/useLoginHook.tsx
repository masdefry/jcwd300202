'use client'

import { toast } from '@/hooks/use-toast'
import useMutateLoginApi from '../api/useMutateLoginApi'

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
        onSuccess:(res) => {
            toast({
                title: `Login ${role} success`,
            })
        }, 
        onError: (err) => {
            toast({
                title: `Login ${role} failed!`,
                variant: 'destructive'
            }) 
        } })
  
    return {
        mutateLogin, 
        isPendingLogin
    }
}

export default useLoginHook

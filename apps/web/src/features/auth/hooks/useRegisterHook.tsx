'use client'

import { toast } from '@/hooks/use-toast'
import useMutateRegisterApi from '../api/useMutateRegisterApi'

interface IUseRegisterHookProps {
    endPoint: string,
    role: string
}

const useRegisterHook = ({ endPoint, role }: IUseRegisterHookProps) => {
      const { 
        mutateRegister, 
        isPendingRegister 
    } = useMutateRegisterApi({ 
        endPoint, 
        onSuccess:(res) => {
            toast({
                title: `Register ${role} success`,
                description: 'Please check your email to verify'
            })
        }, 
        onError: (err) => {
            console.log(err)
            toast({
                title: `Register ${role} failed!`,
                description: 'Try again',
                variant: 'destructive'
            }) 
        } })
  
    return {
        mutateRegister, 
        isPendingRegister
    }
}

export default useRegisterHook

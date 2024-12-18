'use client'

import toast from 'react-hot-toast'
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
            toast((t) => (
                <span className='flex gap-2 items-center text-sm'>
                  Check your email to verify!
                  <button className='bg-gray-900 hover:opacity-75 active:scale-90 text-white rounded-full px-4 py-1' onClick={() => toast.dismiss(t.id)}>
                    Dismiss
                  </button>
                </span>
              ));
        }, 
        onError: (err: any) => {
            console.log(err)
            toast.error(err?.response?.data?.message)
        } })
  
    return {
        mutateRegister, 
        isPendingRegister
    }
}

export default useRegisterHook

'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, AxiosError } from 'axios'

interface IUserRegisterApiProps {
    endPoint: string,
    onSuccess: (res: AxiosResponse) => void,
    onError: (err: AxiosError) => void
}

const useMutateRegisterApi = ({ endPoint, onSuccess, onError }: IUserRegisterApiProps) => {
     interface IValuesRegister {
        email: string
      }  
    
      const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: async(values: IValuesRegister) => {
            const res = await instance.post(endPoint, values)
            return res
        },
        onSuccess,
        onError
      })
  
    return {
        mutateRegister,
        isPendingRegister
    }
}

export default useMutateRegisterApi
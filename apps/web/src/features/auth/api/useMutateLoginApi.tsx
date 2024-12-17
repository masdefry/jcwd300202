'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, AxiosError } from 'axios'

interface IUserLoginApiProps {
    endPoint: string,
    onSuccess: (res: AxiosResponse) => void,
    onError: (err: AxiosError) => void
}

const useMutateLoginApi = ({ endPoint, onSuccess, onError }: IUserLoginApiProps) => {
     interface IValuesLogin {
        email: string,
        password: string
      }  
    
      const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: async(values: IValuesLogin) => {
            const res = await instance.post(endPoint, values)
            return res.data.data
        },
        onSuccess,
        onError
      })
  
    return {
        mutateLogin,
        isPendingLogin,
    }
}

export default useMutateLoginApi

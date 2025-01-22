'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateUserEmailApi = ({ newEmail, onSuccess, onError }: { newEmail: string | null, onSuccess: (res: any) => void, onError: (err: any) => void, }) => {
    const { mutate: mutateUpdateEmail, isPending: isPendingUpdateEmail } = useMutation({
        mutationFn: async () => {
          const res = await instance.patch('/user/email', {
            email: newEmail,
          })
          return res?.data
        },
        onSuccess,
        onError
      })
  
  
    return {
        mutateUpdateEmail,
        isPendingUpdateEmail
  }
}

export default useMutateUpdateUserEmailApi

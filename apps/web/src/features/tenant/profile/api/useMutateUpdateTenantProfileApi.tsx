'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateTenantProfileApi = ({
    onError,
    onSuccess
  }: {
    onError: (err: any) => void
    onSuccess: (res: any) => void
  }) => {
    const {
        mutate: mutateUpdateTenantProfile,
        isPending: isPendingUpdateTenantProfile,
      } = useMutation({
        mutationFn: async ({
          email,
          pic,
          phoneNumber,
          address,
          companyName,
        }: any) => {
          const res = await instance.patch('/tenant', {
            email,
            pic,
            phoneNumber,
            address,
            companyName,
          })
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateUpdateTenantProfile,
        isPendingUpdateTenantProfile
    }
}

export default useMutateUpdateTenantProfileApi

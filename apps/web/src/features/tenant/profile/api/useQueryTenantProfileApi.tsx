'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryTenantProfileApi = () => {
    const { data: dataTenantProfile, isPending: isPendingTenantProfile } =
    useQuery({
      queryKey: ['getTenantProfile'],
      queryFn: async () => {
        const res = await instance.get('/tenant')
        return res?.data?.data
      },
    })
  
    return {
        dataTenantProfile,
        isPendingTenantProfile
  }
}

export default useQueryTenantProfileApi

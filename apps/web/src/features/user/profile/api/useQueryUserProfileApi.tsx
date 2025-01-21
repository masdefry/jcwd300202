'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryUserProfileApi = () => {
    const { data: dataUserProfile, isPending: isPendingUserProfile } = useQuery({
        queryKey: ['getUserProfile'],
        queryFn: async () => {
          const res = await instance.get('/user')
          return res?.data?.data
        },
      })
  
    return {
        dataUserProfile,
        isPendingUserProfile
    }
}

export default useQueryUserProfileApi

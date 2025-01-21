'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryPropertyDescriptionsApi = ({ params }: { params: { slug: string } }) => {
    const { data: dataPropertyDescriptions, isPending: isPendingPropertyDescriptions, error, isError} = useQuery({
        queryKey: ['getPropertyDescriptions'],
        queryFn: async() => {
          const res = await instance.get(`/property/${params?.slug}`)
          return res?.data?.data
        },
      })
  
    return {
        dataPropertyDescriptions,
        isPendingPropertyDescriptions,
        error,
        isError
    }
}

export default useQueryPropertyDescriptionsApi

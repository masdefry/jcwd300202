'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryPropertyApi = ({ params }: { params: {slug: string} }) => {
    const { data: dataProperty, isPending: isPendingProperty } = useQuery({
        queryKey: ['getProperty'],
        queryFn: async () => {
          const res = await instance.get(`/property/${params?.slug}`)
          return res?.data?.data
        },
      })
  
    return {
        dataProperty,
        isPendingProperty
  }
}

export default useQueryPropertyApi

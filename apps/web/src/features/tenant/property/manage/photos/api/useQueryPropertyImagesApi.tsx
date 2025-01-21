'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryPropertyImagesApi = ({ params }: { params: {slug: string} }) => {
    const { data: dataPropertyImages, isPending: isPendingPropertyImages, isError, error } = useQuery({
        queryKey: ['getPropertyImages'],
        queryFn: async () => {
          const res = await instance.get(`/property-images/${params?.slug}`)
          return res?.data?.data
        },
      })
  
    return {
        dataPropertyImages,
        isError,
        error,
        isPendingPropertyImages
    }
}

export default useQueryPropertyImagesApi

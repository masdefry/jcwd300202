'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryPropertyRoomImagesApi = ({ params }: { params: {slug: string, id: string} }) => {
  const {
    data: dataPropertyRoomImages,
    isPending: isPendingPropertyRoomImages,
    isError,
    error,
  } = useQuery({
    queryKey: ['getPropertyRoomImages'],
    queryFn: async () => {
      const res = await instance.get(`/property-room-images/${params?.id}`)
      return res?.data?.data
    },
  })

  return {
    dataPropertyRoomImages,
    isPendingPropertyRoomImages,
    isError,
    error,
  }
}

export default useQueryPropertyRoomImagesApi

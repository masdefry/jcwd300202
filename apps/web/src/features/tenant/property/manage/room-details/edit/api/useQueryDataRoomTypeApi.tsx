'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryDataRoomTypeApi = ({
  params,
}: {
  params: { slug: string; id: string }
}) => {
  const {
    data: dataPropertyRoomType,
    isPending: isPendingPropertyRoomType,
    isError,
    error,
  } = useQuery({
    queryKey: ['getPropertyRoomType'],
    queryFn: async () => {
      const res = await instance.get(`/room-type/tenant/${params?.id}`)
      return res?.data?.data
    },
  })

  return {
    dataPropertyRoomType,
    isPendingPropertyRoomType,
    isError,
    error
  }
}

export default useQueryDataRoomTypeApi

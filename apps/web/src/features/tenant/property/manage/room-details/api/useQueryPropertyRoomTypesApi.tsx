'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

const useQueryPropertyRoomTypesApi = ({ 
  params,
}: {
  params: { slug: string }
}) => {
    const {
        data: dataPropertyRoomTypes,
        isPending: isPendingPropertyRoomTypes,
        isError,
        error,
      } = useQuery({
        queryKey: ['getPropertyRoomTypes'],
        queryFn: async () => {
          const res = await instance.get(
            `/room-type/tenant/${params?.slug}/search?limit=100`,
          )
          return res?.data?.data
        },
      })
  
    return {
        dataPropertyRoomTypes,
        isPendingPropertyRoomTypes,
        isError,
        error
  }
}

export default useQueryPropertyRoomTypesApi

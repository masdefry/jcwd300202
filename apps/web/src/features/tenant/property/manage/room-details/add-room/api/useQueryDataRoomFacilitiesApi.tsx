'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryDataRoomFacilitiesApi = () => {
    const { data: dataRoomFacilities, isPending: isPendingRoomFacilities } =
    useQuery({
      queryKey: ['getPropertyRoomFacilities'],
      queryFn: async () => {
        const res = await instance.get('/room-facility')
        return res?.data?.data
      },
    })
  
    return {
        dataRoomFacilities,
        isPendingRoomFacilities
  }
}

export default useQueryDataRoomFacilitiesApi

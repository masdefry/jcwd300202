'use client'

import instance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useQueryPropertyRoomFacilitiesApi = () => {
    const { data: dataRoomFacilities, isPending: isPendingRoomFacilities } = useQuery({
        queryKey: ['getPropertyRoomFacilities'],
        queryFn: async () => {
          const res = await instance.get('/room-facility');
          return res?.data?.data;
        },
      });
  
    return {
        isPendingRoomFacilities,
        dataRoomFacilities
    }
}

export default useQueryPropertyRoomFacilitiesApi

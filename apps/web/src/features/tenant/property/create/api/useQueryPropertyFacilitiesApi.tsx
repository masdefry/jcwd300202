'use client'

import instance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const useQueryPropertyFacilitiesApi = () => {
    const { data: dataPropertyFacilities, isPending: isPendingPropertyFacilities } = useQuery({
        queryKey: ['getPropertyFacilities'],
        queryFn: async () => {
          const res = await instance.get('/property-facility');
          return res?.data?.data;
        },
      });
      
  
    return {
        dataPropertyFacilities,
        isPendingPropertyFacilities
    }
}

export default useQueryPropertyFacilitiesApi

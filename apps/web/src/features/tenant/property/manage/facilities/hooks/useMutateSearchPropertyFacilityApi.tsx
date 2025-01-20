'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateSearchPropertyFacilityApi = ({ params, onSuccess, onError }: { onSuccess: (res: any) => void, onError: (err: any) => void, params: { slug: string } }) => {
    const { mutate: mutateSearchPropertyFacility, isPending: isPendingSearchPropertyFacility } = useMutation({
        mutationFn: async (value) => {
          const res = await instance.get(
            `/property-has-facilities/${params?.slug}?name=${value}`,
          )
          return res?.data
        },
        onSuccess,
        onError
      })
  
    return {
        mutateSearchPropertyFacility,
        isPendingSearchPropertyFacility
    }
}

export default useMutateSearchPropertyFacilityApi

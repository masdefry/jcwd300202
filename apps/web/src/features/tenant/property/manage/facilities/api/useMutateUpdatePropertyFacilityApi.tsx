'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdatePropertyFacilityApi = ({ params, onSuccess, onError }: { onSuccess: (res: any) => void, onError: (err: any) => void, params: { slug: string } }) => {
    const {
        mutate: mutateUpdatePropertyHasFacilities,
        isPending: isPendingUpdatePropertyHasFacilities,
      } = useMutation({
        mutationFn: async (values: { propertyFacilitiesId: number[] }) => {
          const res = await instance.put(
            `/property-has-facilities/${params?.slug}`,
            {
              propertyFacilitiesId: values.propertyFacilitiesId,
            },
          )
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateUpdatePropertyHasFacilities,
        isPendingUpdatePropertyHasFacilities
    }
}

export default useMutateUpdatePropertyFacilityApi

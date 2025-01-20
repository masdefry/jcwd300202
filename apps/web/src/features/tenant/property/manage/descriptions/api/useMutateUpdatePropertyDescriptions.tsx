'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdatePropertyDescriptions = ({ params, onSuccess, onError }: { onSuccess: (res: any) => void, onError: (err: any) => void, params: { slug: string } }) => {
    const { mutate: mutateUpdatePropertyDescriptions, isPending: isPendingUpdatePropertyDescriptions } = useMutation({
        mutationFn: async(values: any) => {
          const res = await instance.patch(`/property/descriptions/${params?.slug}`, {
            propertyDescription: values?.propertyDescription,
            neighborhoodDescription: values?.neighborhoodDescription,
            propertyRoomType: values?.propertyRoomType
          })
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateUpdatePropertyDescriptions,
        isPendingUpdatePropertyDescriptions
  }
}

export default useMutateUpdatePropertyDescriptions

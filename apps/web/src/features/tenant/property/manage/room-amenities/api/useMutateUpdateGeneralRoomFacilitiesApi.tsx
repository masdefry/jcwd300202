'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateGeneralRoomFacilitiesApi = ({
  params,
  onError,
  onSuccess
}: {
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateUpdateGeneralRoomFacilities,
    isPending: isPendingUpdateGeneralRoomFacilities,
  } = useMutation({
    mutationFn: async (values: { propertyRoomFacilitiesId: number[] }) => {
      const res = await instance.put(
        `/room-has-facilities/property/${params?.slug}`,
        {
          propertyRoomFacilitiesId: values.propertyRoomFacilitiesId,
        },
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdateGeneralRoomFacilities,
    isPendingUpdateGeneralRoomFacilities
  }
}

export default useMutateUpdateGeneralRoomFacilitiesApi

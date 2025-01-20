'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateSearchGeneralRoomFacilityApi = ({
  params,
  onError,
  onSuccess,
}: {
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateSearchGeneralRoomFacility,
    isPending: isPendingSearchGeneralRoomFacility,
  } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(
        `/room-has-facilities/property/${params?.slug}?name=${value}`,
      )
      return res?.data
    },
    onError,
    onSuccess,
  })

  return {
    mutateSearchGeneralRoomFacility,
    isPendingSearchGeneralRoomFacility,
  }
}

export default useMutateSearchGeneralRoomFacilityApi

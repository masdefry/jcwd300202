'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateSearchRoomFacilityApi = ({
  selectRoom,
  onError,
  onSuccess,
}: {
  onSuccess: (res: any) => void
  onError: (err: any) => void
  selectRoom: string | null
}) => {
  const {
    mutate: mutateSearchRoomFacility,
    isPending: isPendingSearchRoomFacility,
  } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(
        `/room-has-facilities/${selectRoom}?name=${value}`,
      )
      return res?.data
    },
    onSuccess,
    onError,
  })
  return {
    mutateSearchRoomFacility,
    isPendingSearchRoomFacility,
  }
}

export default useMutateSearchRoomFacilityApi

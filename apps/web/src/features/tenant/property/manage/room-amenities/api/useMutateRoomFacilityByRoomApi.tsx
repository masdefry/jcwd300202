'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateRoomFacilityByRoomApi = ({
  selectRoom,
  onError,
  onSuccess
}: {
  selectRoom: null | string
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateRoomFacilityByRoom,
    isPending: isPendingRoomFacilityByRoom,
  } = useMutation({
    mutationFn: async (value) => {
      const res = await instance.get(`/room-has-facilities/${selectRoom}`)
      return res?.data
    },
  })

  return {
    isPendingRoomFacilityByRoom,
    mutateRoomFacilityByRoom
  }
}

export default useMutateRoomFacilityByRoomApi

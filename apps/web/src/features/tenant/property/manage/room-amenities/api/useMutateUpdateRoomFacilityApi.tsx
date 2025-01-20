'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateRoomFacilityApi = ({
    selectRoom,
    onError,
    onSuccess
  }: {
    selectRoom: null | string
    onSuccess: (res: any) => void
    onError: (err: any) => void
  }) => {
    const {
        mutate: mutateUpdateRoomHasFacilities,
        isPending: isPendingUpdateRoomHasFacilities,
      } = useMutation({
        mutationFn: async (values: { propertyRoomFacilitiesId: number[] }) => {
          const res = await instance.put(`/room-has-facilities/${selectRoom}`, {
            propertyRoomFacilitiesId: values.propertyRoomFacilitiesId,
          })
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateUpdateRoomHasFacilities,
        isPendingUpdateRoomHasFacilities
  }
}

export default useMutateUpdateRoomFacilityApi

'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateGetOneDaySeasonApi = ({ onSuccess, onError }: {
    onSuccess: (res: any) => void
    onError: (err: any) => void
  }) => {
    const {
        mutate: mutateGetSeasonalPrice,
        isPending: isPendingGetSeasonalPrice,
      } = useMutation({
        mutationFn: async ({
          propertyRoomTypeId,
          date,
        }: {
          propertyRoomTypeId: number
          date: Date
        }) => {
          const res = await instance.get(
            `/season/single/search?propertyRoomTypeId=${propertyRoomTypeId}&date=${date}`,
          )
          return res?.data
        },
        onSuccess,
        onError 
      })
  return {
    mutateGetSeasonalPrice,
    isPendingGetSeasonalPrice
  }
}

export default useMutateGetOneDaySeasonApi

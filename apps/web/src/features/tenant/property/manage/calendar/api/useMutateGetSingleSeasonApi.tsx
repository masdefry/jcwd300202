'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateGetSingleSeasonApi = ({
  onSuccess,
  onError,
}: {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateGetSeasonalPriceByRoomType,
    isPending: isPendingGetSeasonalPriceByRoomType,
  } = useMutation({
    mutationFn: async ({
      startDate,
      endDate,
      seasonId,
    }: {
      endDate: Date
      seasonId: number | string
      startDate: Date
    }) => {
      const res = await instance.get(
        `/season/single/${seasonId}?startDate=${startDate}&endDate=${endDate}`,
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateGetSeasonalPriceByRoomType,
    isPendingGetSeasonalPriceByRoomType,
  }
}

export default useMutateGetSingleSeasonApi

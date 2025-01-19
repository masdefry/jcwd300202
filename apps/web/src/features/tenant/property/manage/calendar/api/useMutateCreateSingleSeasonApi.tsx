'use client'

import {
  IActiveRoomSetter,
  IDataPropertyRoomTypeSeason,
  IDateRange,
} from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreateSingleSeasonApi = ({
  dataPropertyRoomTypeSeason,
  onSuccess,
  onError,
  selectRoom,
  dateRange,
  activeRoomSetter,
}: {
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  selectRoom: string
  dateRange: IDateRange
  activeRoomSetter: IActiveRoomSetter
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateCreateOneSeason, isPending: isPendingCreateOneSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.post(`/season/single`, {
          seasonId: dataPropertyRoomTypeSeason?.seasonId,
          roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
          roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
          availability: dataPropertyRoomTypeSeason?.availability,
          pricePercentage: dataPropertyRoomTypeSeason?.pricePercentage,
          propertyRoomTypeId: selectRoom,
          name: dataPropertyRoomTypeSeason?.name,
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
          isPeak: dataPropertyRoomTypeSeason?.isPeak,
        })
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateCreateOneSeason,
    isPendingCreateOneSeason,
  }
}

export default useMutateCreateSingleSeasonApi

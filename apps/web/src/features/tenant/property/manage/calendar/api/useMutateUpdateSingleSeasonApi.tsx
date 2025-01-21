'use client'

import {
  IActiveRoomSetter,
  IDataPropertyRoomTypeSeason,
  IDateRange,
} from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateSingleSeasonApi = ({
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
  const {
    mutate: mutateUpdateSingleSeason,
    isPending: isPendingUpdateSingleSeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.put(
        `/season/single/${dataPropertyRoomTypeSeason?.seasonId}`,
        {
          seasonId: dataPropertyRoomTypeSeason?.seasonId,
          roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
          roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
          availability: dataPropertyRoomTypeSeason?.availability,
          pricePercentage: dataPropertyRoomTypeSeason?.pricePercentage,
          propertyRoomTypeId: selectRoom,
          name: dataPropertyRoomTypeSeason?.name,
          startDate: dataPropertyRoomTypeSeason?.startDate,
          endDate: dataPropertyRoomTypeSeason?.endDate,
          isPeak: dataPropertyRoomTypeSeason?.isPeak,
        },
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdateSingleSeason,
    isPendingUpdateSingleSeason,
  }
}

export default useMutateUpdateSingleSeasonApi

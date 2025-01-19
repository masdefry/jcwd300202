'use client'

import { IActiveRoomSetter, IDataPropertyRoomTypeSeason, IDateRange } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

const useMutateUpdateOneDaySeasonApi = ({
  dataPropertyRoomTypeSeason,
  activeRoomSetter,
  dateRange,
  onSuccess,
  onError,
}: {
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  activeRoomSetter: IActiveRoomSetter
  dateRange: IDateRange
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateUpdateSeason, isPending: isPendingUpdateSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.put(
          `/season/${dataPropertyRoomTypeSeason?.propertyRoomTypeId}`,
          {
            seasonId: dataPropertyRoomTypeSeason?.seasonId,
            seasonalPriceId: dataPropertyRoomTypeSeason?.seasonalPriceId,
            roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
            roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
            availability: dataPropertyRoomTypeSeason?.availability,
            name: dataPropertyRoomTypeSeason?.name,
            startDate: activeRoomSetter?.startDate || dateRange?.startDate,
            endDate: activeRoomSetter?.endDate || dateRange?.endDate,
            isPeak: dataPropertyRoomTypeSeason?.isPeak,
          },
        )

        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateUpdateSeason,
    isPendingUpdateSeason
  }
}

export default useMutateUpdateOneDaySeasonApi

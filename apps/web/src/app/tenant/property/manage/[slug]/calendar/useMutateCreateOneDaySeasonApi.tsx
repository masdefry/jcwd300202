'use client'

import { IActiveRoomSetter, IDataPropertyRoomTypeSeason, IDateRange } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

const useMutateCreateOneDaySeasonApi = ({
  dataPropertyRoomTypeSeason,
  activeRoomSetter,
  dateRange,
  onSuccess,
  onError,
}: {
    dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason,
    dateRange: IDateRange,
    activeRoomSetter: IActiveRoomSetter,
    onSuccess: (res: any) => void
    onError: (err: any) => void
}) => {
  const { mutate: mutateCreateSeason, isPending: isPendingCreateSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.post('/season', {
          roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
          roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
          availability: dataPropertyRoomTypeSeason?.availability,
          propertyRoomTypeId: dataPropertyRoomTypeSeason?.propertyRoomTypeId,
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
    mutateCreateSeason,
    isPendingCreateSeason,
  }
}

export default useMutateCreateOneDaySeasonApi

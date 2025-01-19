'use client'

import { IActiveRoomSetter, IDataPropertyRoomTypeSeason, IDateRange } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'

const useMutateDeleteOneDaySeasonApi = ({
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
  const { mutate: mutateDeleteSeason, isPending: isPendingDeleteSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.delete(
          `/season/${dataPropertyRoomTypeSeason?.propertyRoomTypeId}?seasonalPriceId=${dataPropertyRoomTypeSeason?.seasonalPriceId}`,
        )
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateDeleteSeason,
    isPendingDeleteSeason,
  }
}

export default useMutateDeleteOneDaySeasonApi

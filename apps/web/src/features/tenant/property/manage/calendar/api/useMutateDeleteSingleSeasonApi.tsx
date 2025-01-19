'use client'
import { IDataPropertyRoomTypeSeason } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeleteSingleSeasonApi = ({
  dataPropertyRoomTypeSeason,
  onSuccess,
  onError,
  selectedPropertyRoomType,
}: {
  dataPropertyRoomTypeSeason: IDataPropertyRoomTypeSeason
  selectedPropertyRoomType: any
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateDeleteSingleSeason,
    isPending: isPendingDeleteSingleSeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.delete(
        `/season/single/${dataPropertyRoomTypeSeason?.seasonId}?propertyRoomTypeId=${selectedPropertyRoomType?.id}`,
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateDeleteSingleSeason,
    isPendingDeleteSingleSeason,
  }
}

export default useMutateDeleteSingleSeasonApi

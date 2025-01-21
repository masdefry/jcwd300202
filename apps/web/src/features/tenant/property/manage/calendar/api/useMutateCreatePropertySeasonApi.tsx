'use client'

import { IBulkSeason } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreatePropertySeasonApi = ({
  dataBulkSeason,
  params,
  onError,
  onSuccess,
}: {
  dataBulkSeason: IBulkSeason
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateCreatePropertySeason,
    isPending: isPendingCreatePropertySeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/season/property/${params?.slug}`, {
        pricePercentage: dataBulkSeason?.pricePercentage,
        availability: dataBulkSeason?.availability,
        name: dataBulkSeason?.name,
        startDate: dataBulkSeason?.startDate,
        endDate: dataBulkSeason?.endDate,
        isPeak: dataBulkSeason?.isPeak,
      })

      return res?.data
    },
    onSuccess,
    onError,
  })
  return {
    mutateCreatePropertySeason,
    isPendingCreatePropertySeason,
  }
}

export default useMutateCreatePropertySeasonApi

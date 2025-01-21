'use client'

import { IBulkSeason } from '@/features/tenant/property/manage/calendar/types'
import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeletePropertySeasonApi = ({
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
    mutate: mutateDeletePropertySeason,
    isPending: isPendingDeletePropertySeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.delete(
        `/season/property/${params?.slug}?seasonId=${dataBulkSeason?.seasonId}`,
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateDeletePropertySeason,
    isPendingDeletePropertySeason,
  }
}

export default useMutateDeletePropertySeasonApi

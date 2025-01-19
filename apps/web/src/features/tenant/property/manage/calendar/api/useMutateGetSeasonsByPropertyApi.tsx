'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateGetSeasonsByPropertyApi = ({
  params,
  onSuccess,
  onError,
}: {
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateDataSeasonsByProperty,
    isPending: isPendingDataSeasonsByProperty,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.get(`season/property/${params?.slug}`)
      return res
    },
    onSuccess,
    onError,
  })

  return {
    mutateDataSeasonsByProperty,
    isPendingDataSeasonsByProperty,
  }
}

export default useMutateGetSeasonsByPropertyApi

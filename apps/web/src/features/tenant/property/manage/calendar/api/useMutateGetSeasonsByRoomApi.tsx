'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateGetSeasonsByRoomApi = ({
  selectRoom,
  onSuccess,
  onError,
}: {
  selectRoom: string
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateDataSeasonsByPropertyRoomType,
    isPending: isPendingDataSeasonsByPropertyRoomType,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.get(`season/${selectRoom}`)
      return res
    },
    onSuccess,
    onError,
  })

  return {
    mutateDataSeasonsByPropertyRoomType,
    isPendingDataSeasonsByPropertyRoomType,
  }
}

export default useMutateGetSeasonsByRoomApi

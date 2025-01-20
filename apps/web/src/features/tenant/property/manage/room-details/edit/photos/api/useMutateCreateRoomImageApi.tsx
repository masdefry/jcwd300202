'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreateRoomImageApi = ({
  params,
  onError,
  onSuccess,
}: {
  params: { slug: string; id: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateCreatePropertyRoomImage,
    isPending: isPendingCreatePropertyRoomImage,
  } = useMutation({
    mutationFn: async (fd: FormData) => {
      const res = await instance.post(`/property-room-images/${params?.id}`, fd)
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateCreatePropertyRoomImage,
    isPendingCreatePropertyRoomImage,
  }
}

export default useMutateCreateRoomImageApi

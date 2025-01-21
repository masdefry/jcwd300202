'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateCreateRoomApi = ({
  params,
  onError,
  onSuccess
}: {
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateCreateRoom, isPending: isPendingCreateRoom } =
    useMutation({
      mutationFn: async (fd: FormData) => {
        const res = await instance.post(
          `/room-type/property/${params?.slug}`,
          fd,
        )
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateCreateRoom,
    isPendingCreateRoom
  }
}

export default useMutateCreateRoomApi

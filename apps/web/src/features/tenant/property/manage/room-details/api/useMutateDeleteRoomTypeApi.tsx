'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeleteRoomTypeApi = ({ params, dataForDelete, onError, onSuccess }: {
    dataForDelete: any,
    params: {slug: string},
    onError: (err: any) => void,
    onSuccess: (res: any) => void
}) => {
  const {
    mutate: mutateDeletePropertyRoomType,
    isPending: isPendingDeletePropertyRoomType,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.patch(
        `/room-type/delete/${params?.slug}?propertyRoomTypeId=${dataForDelete?.id}`,
        {
          password: dataForDelete?.password,
        },
      )
      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateDeletePropertyRoomType,
    isPendingDeletePropertyRoomType
  }
}

export default useMutateDeleteRoomTypeApi

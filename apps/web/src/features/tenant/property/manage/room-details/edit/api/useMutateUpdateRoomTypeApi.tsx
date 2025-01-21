'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateRoomTypeApi = ({
    params,
    onError,
    onSuccess
  }: {
    params: { slug: string; id: string }
    onSuccess: (res: any) => void
    onError: (err: any) => void
  }) => {
    const {
        mutate: mutateUpdatePropertyRoomTypeGeneral,
        isPending: isPendingUpdatePropertyRoomTypeGeneral,
      } = useMutation({
        mutationFn: async (values: any) => {
          const res = await instance.patch(`/room-type/property/${params?.slug}`, {
            name: values?.name,
            totalRooms: values?.totalRooms,
            rooms: values?.rooms,
            bathrooms: values?.bathrooms,
            capacity: values?.capacity,
            price: values?.price,
            propertyRoomTypeId: params?.id,
          })
          console.log(res)
          return res?.data
        },
        onSuccess,
        onError,
      })
  
    return {
        mutateUpdatePropertyRoomTypeGeneral,
        isPendingUpdatePropertyRoomTypeGeneral
  }
}

export default useMutateUpdateRoomTypeApi

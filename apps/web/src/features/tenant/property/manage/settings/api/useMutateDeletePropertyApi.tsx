'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeletePropertyApi = ({
  dataForDelete,
  params,
  onError,
  onSuccess,
}: {
  dataForDelete: any
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const { mutate: mutateDeleteProperty, isPending: isPendingDeleteProperty } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.patch(`/property/delete/${params?.slug}`, {
          password: dataForDelete?.password,
        })
        return res?.data
      },
      onSuccess,
      onError,
    })

  return {
    mutateDeleteProperty,
    isPendingDeleteProperty,
  }
}

export default useMutateDeletePropertyApi

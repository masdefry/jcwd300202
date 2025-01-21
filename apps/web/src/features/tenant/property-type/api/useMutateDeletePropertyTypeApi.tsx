'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateDeletePropertyTypeApi = ({
  onError,
  onSuccess,
}: {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateDeletePropertyType,
    isPending: isPendingDeletePropertyType,
  } = useMutation({
    mutationFn: async ({ id, password }: { id: number; password: string }) => {
      const res = await instance.patch('/property-type/delete', {
        propertyTypeId: id,
        password,
      })

      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateDeletePropertyType,
    isPendingDeletePropertyType
  }
}

export default useMutateDeletePropertyTypeApi

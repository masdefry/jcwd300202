'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'

interface IUseMutateUpdatePropertyTypeApiProps {
  onSuccess: (res: any) => void
  onError: (err: any) => void
}
const useMutateUpdatePropertyTypeApi = ({
  onError,
  onSuccess,
}: IUseMutateUpdatePropertyTypeApiProps) => {
  const {
    mutate: mutateUpdatePropertyType,
    isPending: isPendingUpdatePropertyType,
  } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.patch('/property-type', {
        propertyTypeId: values?.id,
        name: values?.name,
        description: values?.description,
      })

      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdatePropertyType,
    isPendingUpdatePropertyType
  }
}

export default useMutateUpdatePropertyTypeApi

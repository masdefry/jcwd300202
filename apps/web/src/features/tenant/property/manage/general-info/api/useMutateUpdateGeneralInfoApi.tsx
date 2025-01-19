'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useMutateUpdateGeneralInfoApi = ({
  params,
  onSuccess,
  onError
}: {
  params: { slug: string }
  onSuccess: (res: any) => void
  onError: (err: any) => void
}) => {
  const {
    mutate: mutateUpdateGeneralInfo,
    isPending: isPendingUpdateGeneralInfo,
  } = useMutation({
    mutationFn: async (values: any) => {
      const res = await instance.patch(
        `/property/general-info/${params?.slug}`,
        {
          name: values?.name,
          address: values?.address,
          zipCode: values?.zipCode,
          location: values?.location,
          cityId: values?.cityId,
          countryId: values?.countryId,
          checkInStartTime: values?.checkInStartTime,
          checkInEndTime: values?.checkInEndTime,
          checkOutStartTime: values?.checkOutStartTime,
          checkOutEndTime: values?.checkOutEndTime,
          star: values?.star,
          phoneNumber: values?.phoneNumber,
          url: values?.url,
        },
      )

      return res?.data
    },
    onSuccess,
    onError,
  })

  return {
    mutateUpdateGeneralInfo,
    isPendingUpdateGeneralInfo
  }
}

export default useMutateUpdateGeneralInfoApi

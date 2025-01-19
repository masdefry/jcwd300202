'use client'

import instance from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useQueryGeneralInfoApi = ({
  params,
  setCityId,
  setCountryId,
  setPropertyTypeId,
}: {
  params: { slug: string }
  setCityId: any
  setCountryId: any
  setPropertyTypeId: any
}) => {
  const {
    data: dataPropertyGeneralInfo,
    isPending: isPendingPropertyGeneralInfo,
    isError,
    error,
  } = useQuery({
    queryKey: ['getPropertyGeneralInfo'],
    queryFn: async () => {
      const res = await instance.get(`/property/${params?.slug}`)
      setCityId(res?.data?.data?.property?.cityId)
      setCountryId(res?.data?.data?.property?.countryId)
      setPropertyTypeId(res?.data?.data?.property?.propertyTypeId)
      return res?.data?.data
    },
  })
  return {
    dataPropertyGeneralInfo,
    isPendingPropertyGeneralInfo,
    isError,
    error,
  }
}

export default useQueryGeneralInfoApi

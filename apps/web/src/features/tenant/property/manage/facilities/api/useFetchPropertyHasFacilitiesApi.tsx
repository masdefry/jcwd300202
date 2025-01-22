'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'

const useFetchPropertyHasFacilitiesApi = ({
  params,
  handleError,
  handleFinally,
  handleSuccess,
}: {
  params: { slug: string }
  handleSuccess: (res: AxiosResponse) => void
  handleError: (err: any) => void
  handleFinally: () => void
}) => {
  const fetchPropertyHasFacilities = async () => {
    try {
      const res = await instance.get(`/property-has-facilities/${params?.slug}`)
      handleSuccess(res)
    } catch (err: any) {
      handleError(err)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchPropertyHasFacilities
  }
}

export default useFetchPropertyHasFacilitiesApi

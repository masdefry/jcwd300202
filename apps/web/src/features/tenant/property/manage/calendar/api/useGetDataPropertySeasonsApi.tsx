'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'

const useGetDataPropertySeasonsApi = ({
  handleSuccess,
  handleError,
  handleFinally,
  params,
}: {
  handleSuccess: (res: AxiosResponse) => void
  handleError: (err: any) => void
  handleFinally: () => void
  params: { slug: string }
}) => {
  const fetchDataSeasonsByProperty = async () => {
    try {
      const res = await instance.get(`season/property/${params?.slug}`)
      handleSuccess(res)
    } catch (err: any) {
      handleError(err)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchDataSeasonsByProperty,
  }
}

export default useGetDataPropertySeasonsApi

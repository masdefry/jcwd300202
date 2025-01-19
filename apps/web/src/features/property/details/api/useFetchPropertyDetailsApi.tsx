'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'

const useFetchPropertyDetailsApi = ({
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
  const fetchDataPropertyDetail = async () => {
    try {
      const res = await instance.get(`/property/${params?.slug}/search`)
      handleSuccess(res)
    } catch (err) {
      handleError(err)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchDataPropertyDetail,
  }
}

export default useFetchPropertyDetailsApi

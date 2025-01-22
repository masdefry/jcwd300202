'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'

const useFetchPropertyDetailsTenantApi = ({
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
  const fetchDataPropertyDetailTenant = async () => {
    try {
      const res = await instance.get(`/property/${params?.slug}/tenant`)
      handleSuccess(res)
    } catch (err) {
      handleError(err)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchDataPropertyDetailTenant,
  }
}

export default useFetchPropertyDetailsTenantApi

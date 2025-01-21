'use client'

import instance from '@/utils/axiosInstance'
import { AxiosResponse } from 'axios'
import React from 'react'
import { ISearchParamsTenantPropertyType } from '../types'

const useFetchDataPropertyTypesApi = ({
  searchParams,
  handleError,
  handleFinally,
  handleSuccess,
}: {
  searchParams: ISearchParamsTenantPropertyType
  handleSuccess: (res: AxiosResponse) => void
  handleError: (err: any) => void
  handleFinally: () => void
}) => {
  const fetchDataPropertyTypes = async () => {
    try {
      const res = await instance.get(
        `/property-type?name=${searchParams?.name || ''}&order=${searchParams?.order || 'asc'}&limit=${searchParams?.limit || 5}&offset=${searchParams?.offset || 0}`,
      )
      handleSuccess(res)
    } catch (error) {
      handleError(error)
    } finally {
      handleFinally()
    }
  }

  return {
    fetchDataPropertyTypes,
  }
}

export default useFetchDataPropertyTypesApi
